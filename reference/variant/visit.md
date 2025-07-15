# visit
* variant[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class Visitor, class... Variants>
  constexpr see below visit(Visitor&& vis, Variants&&... vars); // (1) C++17

  template <class R, class Visitor, class... Variants>
  constexpr R visit(Visitor&& vis, Variants&&... vars);         // (2) C++20
}
```

## 概要
`variant`オブジェクトが現在保持している型に対応する関数を呼び出す。

- (1) : `variant`オブジェクトが現在保持している型に対応する関数を呼び出し、呼び出された関数の戻り値型で戻り値を返す
- (2) : `variant`オブジェクトが現在保持している型に対応する関数を呼び出し、指定された戻り値型`R`で戻り値を返す

### switch文の自動化／Visitorパターン
`variant`オブジェクトに代入される型は実行時に決定される。そのため、通常の方法では、以下のように`switch`文を使用して実行時に代入された型に応じた処理を行うことになる：

```cpp
void f(T1);
void f(T2);
void f(T3);

std::variant<T1, T2, T3> v;

switch (v.index()) {
  case 0:
    f(std::get<0>(v));
    break;

  case 1:
    f(std::get<1>(v));
    break;

  case 2:
    f(std::get<2>(v));
    break;
}
```
* v.index()[link variant/index.md]
* std::get[link variant/get.md]

この`visit()`関数を使用することで、そのような分岐を内部で解決してくれる。これは、GoFのデザインパターンのひとつであるVisitorパターンに対応する機能である。

注意点としては、非メンバ関数のオーバーロードを各型に対応した関数として`visit()`関数に指定することはできないということである。引数の型が静的に決まらなければ関数ポインタを取得できないため、関数ポインタではオーバーロードの集合をまとめて`visit()`関数に渡すことができない。そのため、`visit()`関数に指定するオーバーロードの集合には、必然的に関数オブジェクトを使用することになる。

```cpp
struct Visitor {
  void operator()(T1) {}
  void operator()(T2) {}
  void operator()(T3) {}
};

std::variant<T1, T2, T3> v;
std::visit(Visitor{}, v); // vに実行時に代入された型に応じた関数オーバーロードを呼び出す
```


### 呼び出された関数から戻り値を返す
戻り値を返す場合は、それぞれの関数オーバーロードに単に戻り値の型を定義すればよいが、全てのオーバーロードで共通の型でなければならない。これは、`std::visit()`関数自体の戻り値の型は静的に決定されなければならないためである。

```cpp
struct Visitor {
  int operator()(T1) { return 0; }
  int operator()(T2) { return 1; }
  int operator()(T3) { return 2; }
};

std::variant<T1, T2, T3> v;

// vに実行時に代入された型に応じた関数オーバーロードを呼び出し、戻り値を受け取る
int result = std::visit(Visitor{}, v);
```

### 複数の`variant`オブジェクトから呼び出す関数オーバーロードを決定する
複数の`variant`オブジェクトが保持するそれぞれの値を引数として、対応する関数を呼び出すこともできる。その場合、とりうる全ての組み合わせをオーバーロードとして定義していなければならない。これは、オーバーロードを呼び出すインスタンス化はコンパイル時に行われるためである。

```cpp
struct Visitor {
  void operator()(T1, T1) {}
  void operator()(T1, T2) {}
  void operator()(T1, T3) {}
  void operator()(T2, T1) {}
  void operator()(T2, T2) {}
  void operator()(T2, T3) {}
  void operator()(T3, T1) {}
  void operator()(T3, T2) {}
  void operator()(T3, T3) {}
};

std::variant<T1, T2, T3> arg1;
std::variant<T1, T2, T3> arg2;

// arg1とarg2に実行時に代入された型に応じた関数オーバーロードを呼び出す
std::visit(Visitor{}, arg1, arg2);
```


### 全ての候補型で共通の操作を行う場合は、ジェネリックラムダを使用できる
代入される型ごとにオーバーロードを定義できることは有用だが、すでに操作が共通化されていたり、共通の操作にアダプトできる場合 (GoFのデザインパターンのひとつであるAdapterパターンなど)、使用するビジター関数オブジェクトとして、ジェネリックラムダを使用できる。

```cpp
std::variant<T1, T2, T3> v;

// T1, T2, T3のいずれの型が代入されたとしても、処理内容は共通
std::visit([](const auto& x) {
  std::cout << x << std::endl;
}, v);
```



## 適格要件
- 全ての`vars...`に代入された[`size_t`](/reference/cstddef/size_t.md)型インデックスのパックを`m`とする
- (1) : 全ての`m`の組み合わせについて、式[`INVOKE`](/reference/concepts/Invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<Visitor>(vis),` [`get`](variant/get.md)`<m>(`[`std::forward`](/reference/utility/forward.md)`<Variants>(vars))...)`が適格であること
- (2) : 全ての`m`の組み合わせについて、式[`INVOKE`](/reference/concepts/Invoke.md)`<R>(`[`std::forward`](/reference/utility/forward.md)`<Visitor>(vis),` [`get`](variant/get.md)`<m>(`[`std::forward`](/reference/utility/forward.md)`<Variants>(vars))...)`が適格であること


## 戻り値
- 現在全ての`vars...`に代入されている[`size_t`](/reference/cstddef/size_t.md)型インデックスのパックを`m`とする
- (1) : 式[`INVOKE`](/reference/concepts/Invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<Visitor>(vis),` [`get`](variant/get.md)`<m>(`[`std::forward`](/reference/utility/forward.md)`<Variants>(vars))...)`を呼び出して返す。戻り値の型は、その呼び出しの戻り値の型となる
- (2) : 式[`INVOKE<R>`](/reference/concepts/Invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<Visitor>(vis),` [`get`](variant/get.md)`<m>(`[`std::forward`](/reference/utility/forward.md)`<Variants>(vars))...)`を呼び出して返す

`vars...`が空で、ビジターのみが指定された場合、引数なしのオーバーロードを呼び出して返す。


## 例外
- `vars...`のいずれかの[`valueless_by_exception()`](variant/valueless_by_exception.md)が`true`である場合、[`bad_variant_access`](/reference/variant/bad_variant_access.md)例外が送出される


## 計算量
- `sizeof...(Variants)`が1以下である場合、一度だけ対応する関数を呼び出す (定数時間)。そうでない場合、計算量は実装に要求しない


## 備考
- この関数は、[Boost Variant Library](https://boost.org/libs/variant)では[`apply_visitor()`](https://www.boost.org/doc/libs/release/doc/html/boost/apply_visitor.html)という名前で定義される


## 例
```cpp example
#include <iostream>
#include <variant>
#include <string>

// 2倍にする。
// 整数だったら数値を2倍にし、
// 文字列だったら同じ文字列を2回繰り返す
struct TimesTwoVisitor {
  void operator()(int& n)
  {
    n *= 2;
  }

  void operator()(std::string& s)
  {
    s += s;
  }
};

int main()
{
  std::variant<int, std::string> v = 2;
  std::visit(TimesTwoVisitor{}, v);
  std::visit([](const auto& x) { std::cout << x << std::endl; }, v);

  v = std::string{"Hello"};
  std::visit(TimesTwoVisitor{}, v);
  std::visit([](const auto& x) { std::cout << x << std::endl; }, v);
}
```
* std::visit[color ff0000]

### 出力
```
4
HelloHello
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0655R1 `visit<R>`: Explicit Return Type for `visit`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0655r1.pdf)
- [LWG Issue 2970. Return type of `std::visit` misspecified](https://wg21.cmeerw.net/lwg/issue2970)
