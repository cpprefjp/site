# 通常関数の戻り値型推論
* cpp14[meta cpp]

## 概要
関数宣言の構文において、先頭の戻り値型を`auto`もしくは[`decltype(auto)`](decltype_auto.md)とすることで、戻り値の型が関数の`return`文から推論される。

```cpp
// 関数f()の戻り値型はint
auto f()
{
  return 42;
}
```

[`decltype(auto)`](decltype_auto.md)は、戻り値として変数への参照を返したい場合に使用する。

```cpp
// autoの場合はintが戻り値型となるが、
// decltype(auto)とすることでint&が戻り値型となる。
decltype(auto) f(int& r)
{
  return r;
}
```

この関数宣言構文はメンバ関数に対しても使用できる。

先行宣言をする場合、その関数を使用するコードから、関数の定義が見える必要がある。


## 仕様
### 先行宣言と再宣言
戻り値の型を推論する関数宣言構文は、先行宣言と再宣言を許可する。

```cpp
auto f(); // 先行宣言

auto f() // 定義
{
  return 42;
}

auto f(); // 再宣言
```

これは、関数テンプレートの場合も同様である。

ただし、戻り値の型を推論する関数宣言構文で先行宣言した場合に、通常の戻り値型を指定する関数宣言構文では再宣言できない。

```cpp
auto f(); // 先行宣言
int f(); // コンパイルエラー : 再宣言に別な関数宣言構文を使用できない
```

関数テンプレートの明示的な特殊化とインスタンス化の場合も、同じ関数宣言構文を使用する必要がある。


### 複数個のreturn文
複数の`return`文がある場合には[それらの式に共通する型](/reference/type_traits/common_type.md)が戻り値の型となる。

複数の`return`文があり、それらに共通する型がない場合、プログラムは不適格となる。

```cpp
// 戻り値の型は、intとconst int&の共通の型であるint
auto f()
{
  int x = 3;
  const int& cx = x;

  if (true)
    return x;
  else
    return cx;
}
```


### 再帰
戻り値の型を推論する関数宣言構文は、再帰を許可する：

```cpp
auto sum(int i) {
  if (i == 1)
    return i;            // 戻り値の型がintに推論される
  else
    return sum(i-1) + i; // OK : まだ戻り値の型が確定はしていない
}
```

ただし、戻り値の型が確定しない再帰は許可しない：

```cpp
auto h() { return h(); } // コンパイルエラー
```

相互再帰は許可しない：

```cpp
// パラメータnが偶数か奇数かを判定する関数
// お互いの関数が、お互いの実装を使用する
auto is_even(int n);
auto is_odd(int n);

auto is_even(int n)
{
  return n == 0 ? true : is_odd(n - 1); // コンパイルエラー : 戻り値の型を推論できない
}

auto is_odd(int n)
{
  return n == 0 ? false : is_even(n - 1); // コンパイルエラー : 戻り値の型を推論できない
}
```


### テンプレートによる戻り値型の置き換え失敗は、SFINAEではなくコンパイルエラー
戻り値の型を推論する関数宣言構文において、戻り値の型がテンプレートのインスタンス化で推論される場合、そのインスタンス化の失敗は、テンプレートの置き換え失敗ではなくエラーとする。`decltype`にはラムダ式を渡せないために、`decltype`によって戻り値型を推論する関数宣言構文ではラムダ式を返せないように思えるが、この仕様によって、戻り値の型を推論する関数宣言構文で、ラムダ式を`return`文で返すことを許可する。

```cpp
// ラムダ式によって定義される、一意な名前の関数オブジェクト型を返す
auto f()
{
  return []{};
}
```


### 戻り値型推論の補助
戻り値の型を推論する関数宣言構文において、プレースホルダー型である`auto`に対して、CV修飾、参照修飾、ポインタ修飾などを付加して戻り値型の推論を補助できる。

たとえば、以下のように静的変数を返した場合、関数`f()`の戻り値型は`int`であると推論される：

```cpp
static int static_value = 3;
auto f()
{
  return static_value;
}
```

この関数が必ず`int&`を返したい、という場合には、戻り値型のプレースホルダーを`auto&`のように参照修飾することで、戻り値を参照として返せる：

```cpp
static int static_value = 3;
auto& f()
{
  return static_value;
}
```

この機能は、[戻り値の型を後置する関数宣言構文](/lang/cpp11/trailing_return_types.md)と[ラムダ式](/lang/cpp11/lambda_expressions.md)の、後置戻り値型(trailing return type)に対しても適用できる。以下のページを参照：

- [後置戻り値型をプレースホルダーにすることを許可](placeholder_type_in_trailing_return_type.md)


### 初期化子リストの推論
戻り値の型を推論する関数宣言構文において、波カッコで囲まれた初期化子リストは、`return`文で返せない。

これは、配列を`return`文で返せない仕様によるものである。


### 仮想関数への適用は許可しない
戻り値の型を推論する関数宣言構文は、仮想関数には使用できない。

これは、オーバーライドのチェックと仮想関数テーブルのレイアウトが複雑になるためである。


## 例
```cpp example
#include <iostream>

// 関数オブジェクトfを呼び出した結果の型を、関数g()の戻り値型とする
template <class F>
auto g(F f) 
{
  return f();
}

int main()
{
  // 変数resultの型はint
  auto result = g([]{ return 3; });
  std::cout << result << std::endl;
}
```

### 出力
```
3
```


## この機能が必要になった背景・経緯
戻り値の型を推論する関数宣言構文は、C++11で導入された`auto`キーワードによる変数の型推論、[ラムダ式](/lang/cpp11/lambda_expressions.md)での戻り値型推論に合わせて導入された。

C++11で、[戻り値の型を後置する関数宣言構文](/lang/cpp11/trailing_return_types.md)が導入され、それによって`decltype`を使用して`return`文に指定した式の結果となる型を容易に返せるようになった：

```cpp
// 関数オブジェクトfを呼び出した結果の型を、関数g()の戻り値型とする
template <class F>
auto g(F f) -> decltype(f()) { return f(); }
```

しかしこの表記は、同じ式を2回書くことになるため冗長だった。戻り値の型を推論できるようになったことで、これがより短く簡潔に書けるようになった：

```cpp
template <class F>
auto g(F f) { return f(); }
```


## 検討されたほかの選択肢
[戻り値の型を後置する関数宣言構文](/lang/cpp11/trailing_return_types.md)のページを参照。


## 関連項目
- [C++11 戻り値の型を後置する関数宣言構文](/lang/cpp11/trailing_return_types.md)
- [C++14 `decltype(auto)`](decltype_auto.md)
- [C++14 後置戻り値型をプレースホルダーにすることを許可](placeholder_type_in_trailing_return_type.md)


## 参照
- [N2954 Unified Function Syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2954.html)
- [N3386 Return type deduction for normal functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3386.html)
- [N3582 Return type deduction for normal functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3582.html)
- [N3638 Return type deduction for normal functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3638.html)
- [CWG Issue 1048. `auto` deduction and lambda return type deduction.](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1048)
- [CWG Issue 1588. Deducing cv-qualified `auto`](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1588)

