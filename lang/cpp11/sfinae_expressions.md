# 任意の式によるSFINAE
* cpp11[meta cpp]

## 概要
「SFINAE (Substitution Failure Is Not An Errorの略称、スフィネェと�む)」は、テンプレートの置き換えに失敗した際に、即時にコンパイルエラーとはせず、置き換えに失敗した関数をオーバー�ード解決の候補から除外するという言語機能である。

たとえば、関数のシグニチャの一部として「`typename T::value_type`」が書いてあり、型`T`が`value_type`という型を持っていない場合、その関数がオーバー�ード解決から除外される。これによって型が任意の機能を持っているかを、コンパイル時に判定できた。

しかしC++03において、SFINAEによって「型`T`に関する任意の式が有効かどうかを判定できるか」は仕様として曖昧だった。C++11ではこの曖昧さが取り除かれ、任意の式が有効かどうかでSFINAEが処理されることとなった。

```cpp example
#include <iostream>

template <class T1, class T2>
auto is_addable(T1 a, T2 b) -> decltype(a + b, bool())
{
  std::cout << "型T1とT2の間で、+演算�による加算が可能" << std::endl;
  return true;
}

auto is_addable(...) -> bool
{
  std::cout << "型T1とT2の間では、+演算�による加算はできない" << std::endl;
  return false;
}

struct X {};
int main()
{
  // int型とint型で+演算�による加算が可能か
  is_addable(3, 2);

  // int型とX型で+演算�による加算が可能か
  is_addable(3, X());
}
```
* a + b[color ff0000]

出力：

```
型T1とT2の間で、+演算�による加算が可能
型T1とT2の間では、+演算�による加算はできない
```

このプ�グラムにおいて、戻り値型の文脈での`a + b`という式に対してSFINAEが働く。これと同じように、`a.f(arg1, arg2)`のように記述することで、「型`T1`のオブジェクト`a`に対して、引数`arg1`と`arg2`を渡して`f()`関数の呼び出しができるか」を判定できる。


## 仕様
- テンプレート引数の推論プ�セスでのあるポイントでは、テンプレートパラメータを利用する関数型をとり、それらのテンプレートパラメーターを対応するテンプレート引数に置き換えることが必要となる。これは、明示的に指定されたあらゆるテンプレート引数が関数型に置換される場合はテンプレート引数推論のはじめに行い、また、テンプレート引数推論の最後に再度、デフォルト引数から推論もしくは得られたあらゆるテンプレート引数が置き換えられる。
- 置き換えは、関数型、テンプレートパラメータ宣言および(もしあれば)テンプレート要件の�で使用される、全ての型と式に起こる。式は、非定数式を許可する`sizeof`、`decltype`および他のコンテ�ストの内部の配列の範囲、あるいは非型テンプレート引数として現われるもののような定数式だけでなく、一般的な式(つまり非定数式)も含んでいる。【注釈：関数がインスタンス化される場合に限り、例外仕様�の�価な置き換えを行い、置き換えが無効の型もしくは式に帰着する場合、プ�グラムは不適格となる。】
- 置き換えが無効の型もしくは式に帰着する場合、あるいは置き換えられたテンプレート要件を満たせない場合、型推論は失敗する。無効の型もしくは式は、もし置き換えられた引数を使用して書かれた場合、不適格となる。アクセスチェックは置換プ�セスの一部としては行わない。したがって、推論が成功する場合、関数がインスタンス化される場合、アクセスエラーは今までどおり生じる可能性がある。関数型とそのテンプレートパラメータの型の直接のコンテ�スト�の無効の型と式だけが、推論失敗に帰着できる。【注釈:置き換えられた型と式の評価は、クラステンプレート特殊化および(または)関数テンプレート特殊化のインスタンス化、暗黙に定義された関数�の生成のような副作用に帰着する場合がある。そのような副作用は「直接のコンテ�スト」ではなく不適格なプ�グラムに帰着できる】

```cpp
struct X { };
struct Y {
  Y(X){}
};

template <class T> auto f(T t1, T t2) -> decltype(t1 + t2); // #1
X f(Y, Y); // #2

X x1, x2;
X x3 = f(x1, x2); // #1の推論に失敗し(X+Xができない)、 #2を呼ぶ
```

注釈：型推論は次の理由で失敗する可能性がある:

- 異なる長さの複数パラメータパックを含んでいるパック拡張をインスタンス化することを試みること。
- 要素型を持った配列を作成することを試みること。`void`、関数型、参照型あるいは抽象型クラス型、あるいは0または負のサイズで配列を作成することを試みること。

```cpp
template <class T> int f(T[5]);
int I = f<int>(0);
int j = f<void>(0); // 無効な配列
```

- 修飾名�のクラス型ではない型を使用することを試みること

```cpp
template <class T> int f(typename T::B*);
int i = f<int>(0);
```

- 以下のような場合に、修飾された�別�の入れ�名のなかで、型を使用することを試みること
    - その型が特殊メンバ(コンストラクタ、デストラクタ�)を含まない場合、あるいは
    - 型が要求されるところで特殊メンバが型ではない場合、あるいは
    - テンプレートが必要なところで特殊メンバがテンプレートではない場合、あるいは
    - 非型が必要なところで特殊メンバが非型ではない場合

```cpp
template <int I> struct X { };
template <template <class T> class> struct Z { };
template <class T> void f(typename T::Y*){}
template <class T> void g(X<T::N>*){}
template <class T> void h(Z<T::template TT>*){}
struct A {};
struct B { int Y; };
struct C {
  using N = int;
};
struct D {
  using TT = int;
};

int main() {
  // 推論はこれらの場合に失敗する：
  f<A>(0); // AはメンバYを含んでいない
  f<B>(0); // BのYメンバは型ではない
  g<C>(0); // CのNメンバは非型ではない
  h<D>(0); // DのTTメンバはテンプレートではない
}
```

- 参照型へのポインタの作成を試みること
- `void`への参照の作成を試みること
- `T`がクラス型でない場合に「`T`のメンバへのポインタ」の作成を試みること

```cpp
template <class T> int f(int T::*);
int i = f<int>(0);
```

- 非型テンプレートパラメータに無効の型を渡すことを試みること

```cpp
template <class T, T> struct S {};
template <class T> int f(S<T, T()>*);
struct X {};
int i0 = f<X>(0);
```

- テンプレート引数式、あるいは式の関数宣言のなかでの、使用のいずれかでの無効の変換を試みること

```cpp
template <class T, T*> int f(int);
int i2 = f<int,1>(0); // 1からint*に変換できない
```

- パラメータが`void`の型を持っているか、その�で戻り値型が関数型、もしくは配列型である関数型の作成を試みること


## 例
### is_addableのメタ関数版
```cpp example
#include <utility>
#include <type_traits>

struct is_addable_impl {
  // 要件を満たしていればtrue_type型を返す
  template <class T, class U>
  static auto check(T*, U*) -> decltype(
    std::declval<T>() + std::declval<U>(),
    std::true_type());

  // 要件を満たしていなければfalse_type型を返す
  template <class T, class U>
  static auto check(...) -> std::false_type;
};

template <class T, class U>
struct is_addable
  : decltype(is_addable_impl::check<T, U>(
               nullptr, nullptr)) {};

struct X {};
int main()
{
  // int型とint型で+演算�による加算が可能か
  static_assert(is_addable<int, int>::value, "int + int is valid");

  // int型とX型で+演算�による加算が可能か
  static_assert(!is_addable<int, X>::value, "int + X is invalid");
}
```
* std::declval[link /reference/utility/declval.md]
* nullptr[link nullptr.md]
* static_assert[link static_assert.md]
* decltype[link decltype.md]

#### 出力
```
```


### 型が完全型かを判定するメタ関数is_complete_type
```cpp example
#include <type_traits>

struct is_complete_type_impl {
  // sizeof(T)が有効かどうかで完全型かを判定する
  template <class T>
  static auto check(T*) -> decltype(
    sizeof(T),
    std::true_type());

  template <class T>
  static auto check(...) -> std::false_type;
};

template <class T>
struct is_complete_type
  : decltype(is_complete_type_impl::check<T>(nullptr)) {};

struct A {};
struct B;

int main()
{
  static_assert(is_complete_type<A>::value, "A is complete type");
  static_assert(!is_complete_type<B>::value, "B is incomplete type");
}
```
* nullptr[link nullptr.md]
* static_assert[link static_assert.md]
* decltype[link decltype.md]

#### 出力
```
```


### 関数が特定の引数で呼び出し可能かを判定するメタ関数is_callable
```cpp example
#include <type_traits>
#include <utility>

template <class... Args>
struct is_callable_impl {
  template <class F>
  static std::true_type
    check(decltype(std::declval<F>()(std::declval<Args>()...), (void)0)*);

  template <class F>
  static std::false_type check(...);
};

template <class F, class... Args>
struct is_callable
  : decltype(is_callable_impl<Args...>::template check<F>(nullptr)) {};

#include <iostream>
#include <string>
int main()
{
  auto f = [](int a, char b, const std::string& c) {
    std::cout << a << ", " << b << ", " << c << std::endl;
  };

  static_assert(is_callable<decltype(f), int, char, const std::string&>::value,
                "f is callable with follow arguments: [int, char, const std::string&]");
  static_assert(!is_callable<decltype(f), int>::value,
                "f is not callable with int type one argument");
}
```
* std::declval[link /reference/utility/declval.md]
* nullptr[link nullptr.md]
* static_assert[link static_assert.md]
* decltype[link decltype.md]

#### 出力
```
```


## 関連項目
- [`<type_traits>`](/reference/type_traits.md)
- [`declval`](/reference/utility/declval.md)
- [`enable_if`](/reference/type_traits/enable_if.md)


## 参照
- [CWG Issue 339. Overload resolution in operand of `sizeof` in constant expression](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#339)
- [N2634 Solving the SFINAE problem for expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2634.html)

