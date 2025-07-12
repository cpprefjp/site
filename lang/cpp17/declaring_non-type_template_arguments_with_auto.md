# 非型テンプレートパラメータのauto宣言 [P0127R2]

* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++14まで、以下のように書いていた「指定された型の定数を受け取る」意図の非型テンプレートパラメータ(non-type template parameter)だが、

```cpp
template <class T, T V>
struct X;

X<int, 3>;
```

C++17ではこの用途のためのシンタックスシュガー(糖衣構文、syntactic sugar)が導入され、テンプレートパラメータを`auto`にして値を受け取ることができるようになった。

```cpp
template <auto X>
struct A {};

A<3>;    // OK
A<true>; // OK
A<'a'>;  // OK
A<3.14>; // コンパイルエラー (浮動小数点数は渡せない)
```

テンプレートの中では、`decltype`を使用すれば`X`の型を取得できる。

この`auto`は、変数宣言の`auto`と同じくプレースホルダーという扱いになる。そのため、`template <auto* P>`や`template <auto& R>`のような推論補助もできる。また、`auto`の代わりに`decltype(auto)`を使うこともできる。

## 仕様

[n4659](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4659.pdf) [temp.param]/4より

型ではないテンプレートパラメータは、次の型(cv 修飾されていてもかまわない)のうちの1つを持たなければならない：

- 整数型または列挙型
- オブジェクトへのポインタまたは関数へのポインタ
- オブジェクトへの左辺値参照または関数への左辺値参照
- メンバへのポインタ
-  [`std::nullptr_t`](/reference/cstddef/nullptr_t.md)
- プレースホルダ型を含む型　<-- この行が追加された

なお、[temp.param]/4 は C++20 で変更予定である。[Working Draft, Standard](http://eel.is/c++draft/temp.param)を参照。

この他にも変更点が多くある。[P0127R2 Declaring non-type template arguments with auto](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0127r2.html)を参照。

## 例
```cpp example
#include <type_traits>

template <auto* X>
struct A {
  using type = decltype(X);
};

int main()
{
  constexpr int* p = nullptr;
  static_assert(std::is_same<A<p>::type, int*>{});
}
```
* decltype[link ../cpp11/decltype.md]

### 出力
```
```

## この機能が必要になった背景・経緯
以下、[P0127R1 Declaring non-type template arguments with auto](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0127r1.html)より引用した。

この提案では、`auto`プレースホルダ型指定子を使用して型でないテンプレートパラメータを宣言できるようにすることを提案する。望ましい効果は、同様の構文が総称ラムダに対して機能するのと同じように、対応する型ではないテンプレート引数の型が自動的に推定されることである。

現在、型ではないテンプレートパラメータの型を明示的に指定しなければならない。これは、任意の型の定数引数を取ることを意図したテンプレートを書くときに不必要な冗長性と柔軟性の低下を招く。

```cpp
template <typename T, T v> struct S { };    // 定義
S<decltype(x), x> s;                    // インスタンス化
```
* decltype[link ../cpp11/decltype.md]

この例では、`decltype`を使用して、`x`の型と値の両方を`S`に渡す前に、`x`の型（コンパイル時定数）を取得する。目的は、`x`の型を別のテンプレート引数として渡す必要がないように`S`の宣言を変更できるようにすることである。これにより、次のようなより簡単なインスタンス化が可能になる。

```cpp
S<x> s; // desired instantiation 
```

これは、テンプレートパラメータリストで`auto`キーワードを使用できるようにすることで実現できる。

```cpp
template <auto v> struct S; // type of v is deduced
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 全ての非型テンプレート引数の定数式評価を許可](/lang/cpp17/allow_constant_evaluation_for_all_non-type_template_arguments.md)
- [C++20 非型テンプレートパラメータとしてクラス型を許可する](/lang/cpp20/class_types_in_non-type_template_parameters.md)


## 参照
- [P0127R1 Declaring non-type template arguments with auto](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0127r1.html)
- [P0127R2 Declaring non-type template parameters with auto](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0127r2.html)
- [C++1z 非型テンプレートパラメータのauto宣言 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/10/26/180406)
