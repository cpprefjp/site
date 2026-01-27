# visit
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template<class Self, class Visitor>
constexpr decltype(auto)
  visit(this Self&&, Visitor&&); // (1) C++26

template<class R, class Self, class Visitor>
constexpr R
  visit(this Self&&, Visitor&&); // (2) C++26
```

## 概要
`variant`オブジェクトが現在保持している型に対応する関数を呼び出す。

- (1) : `variant`オブジェクトが現在保持している型に対応する関数を呼び出し、呼び出された関数の戻り値型で戻り値を返す
- (2) : `variant`オブジェクトが現在保持している型に対応する関数を呼び出し、指定された戻り値型`R`で戻り値を返す

この関数は、非メンバ関数版の[`std::visit()`](/reference/variant/visit.md)と同様の動作をするメンバ関数である。ただし、複数の`variant`オブジェクトから呼び出す関数を決定したい場合には、非メンバ関数版を使用する必要がある。


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
* v.index()[link index.md]
* std::get[link get.md]

この`visit()`メンバ関数を使用することで、そのような分岐を内部で解決してくれる。これは、GoFのデザインパターンのひとつであるVisitorパターンに対応する機能である。

注意点としては、非メンバ関数のオーバーロードを各型に対応した関数として`visit()`メンバ関数に指定することはできないということである。引数の型が静的に決まらなければ関数ポインタを取得できないため、関数ポインタではオーバーロードの集合をまとめて`visit()`メンバ関数に渡すことができない。そのため、`visit()`メンバ関数に指定するオーバーロードの集合には、必然的に関数オブジェクトを使用することになる。

```cpp
struct Visitor {
  void operator()(T1) {}
  void operator()(T2) {}
  void operator()(T3) {}
};

std::variant<T1, T2, T3> v;
v.visit(Visitor{}); // vに実行時に代入された型に応じた関数オーバーロードを呼び出す
```


### 呼び出された関数から戻り値を返す
戻り値を返す場合は、それぞれの関数オーバーロードに単に戻り値の型を定義すればよいが、全てのオーバーロードで共通の型でなければならない。これは、`visit()`メンバ関数自体の戻り値の型は静的に決定されなければならないためである。

```cpp
struct Visitor {
  int operator()(T1) { return 0; }
  int operator()(T2) { return 1; }
  int operator()(T3) { return 2; }
};

std::variant<T1, T2, T3> v;

// vに実行時に代入された型に応じた関数オーバーロードを呼び出し、戻り値を受け取る
int result = v.visit(Visitor{});
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

## 効果
型`V`を以下のように定義する：

```cpp
using V = OVERRIDE_REF(Self&&, COPY_CONST(remove_reference_t<Self>, variant));
```

以下と等価である：

- (1):
    ```cpp
    return std::visit(std::forward<Visitor>(vis), (V)self);
    ```
    * std::visit[link /reference/variant/visit.md]

- (2):
    ```cpp
    return std::visit<R>(std::forward<Visitor>(vis), (V)self);
    ```
    * std::visit[link /reference/variant/visit.md]


## 例
```cpp example
#include <print>
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
  v.visit(TimesTwoVisitor{});
  v.visit([](const auto& x) { std::println("{}", x); });

  v = std::string{"Hello"};
  v.visit(TimesTwoVisitor{});
  v.visit([](const auto& x) { std::println("{}", x); });
}
```
* visit[color ff0000]

### 出力
```
4
HelloHello
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]

## 参照
- [P2637R3 Member `visit`](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2637r3.html)
