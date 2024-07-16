# 非型テンプレートパラメータとしてクラス型を許可する [P0732R2]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
これまで、非型テンプレートパラメータ (non-type template parameter) としては、整数型、ポインタ、参照、[`std::nullptr_t`](/reference/cstddef/nullptr_t.md)、[プレースホルダ型](/lang/cpp17/declaring_non-type_template_arguments_with_auto.md)の値しか受け取ることが許可されていなかった。

```cpp
template <int N>
class X;

X<3> x;
```

C++11以降での[汎用的な定数式`constexpr`](/lang/cpp11/constexpr.md)の導入により、多くのクラスオブジェクトを定数として扱えるようになったことを受けて、C++20ではそのように定数として扱える型を広く非型テンプレートパラメータとして受け取ることが許可される。


## 仕様
非型テンプレートパラメータとして、以下のいずれかに分類される型のオブジェクトを受け取ることができる：

- 構造的型
- [プレースホルダ型を含む型](/lang/cpp17/declaring_non-type_template_arguments_with_auto.md) (`template <auto V> class X;`の`auto`)
- 推論用クラス型のプレースホルダ (`template <class T> A;`があったときの`A x{};`のようなクラステンプレートのテンプレート引数推論を意図した型指定)

構造的型 (structural type) とは以下のいずれかに分類される型である：

- [スカラ型](/reference/type_traits/is_scalar.md)
- [左辺値参照型](/reference/type_traits/is_lvalue_reference.md)
- 以下の特徴をもつリテラルクラス型：
    - すべての基本クラスと非静的メンバ変数が`public`かつ非`mutable`であり、
    - すべての基本クラスと非静的メンバ変数が構造的型もしくはその (多次元) 配列である


## 備考
- C++20では[`std::vector`](/reference/vector/vector.md)および[`std::basic_string`](/reference/string/basic_string.md)を定数式内で使用できるようになるが、これらの型はC++20時点では構造的型に分類されないため、そのオブジェクトをテンプレート引数として渡すことはできない
    - [C++20 可変サイズをもつコンテナのconstexpr化](more_constexpr_containers.md)


## 例
```cpp example
#include <utility>

struct X1 {
  int i;
  float f;

  friend bool operator==(const X1&, const X1&) = default;
};

struct X2 {
  int i;
  float f;

  constexpr X2(int i_, float f_)
    : i(i_), f(f_) {}

  friend bool operator==(const X2&, const X2&) = default;
};

template <int N>
struct C1 {
  static constexpr int value = N;
};

template <float N>
struct C2 {
  static constexpr float value = N;
};

template <X1 x1, X2 x2>
struct C3 {
  static constexpr X1 value1 = x1;
  static constexpr X2 value2 = x2;
};

template <auto V>
struct C4 {
  static constexpr decltype(V) value = V;
};

int main() {
  static_assert(C1<1>::value == 1);
  static_assert(C2<3.14f>::value == 3.14f);

  constexpr X1 x1{1, 3.14f};
  constexpr X2 x2{2, 5.27f};
  using c3 = C3<x1, x2>;
  static_assert(c3::value1 == x1);
  static_assert(c3::value2 == x2);

  static_assert(C4<1>::value == 1);
  static_assert(C4<3.14f>::value == 3.14f);
  static_assert(C4<x1>::value == x1);
  static_assert(C4<x2>::value == x2);

  constexpr std::pair p{1, 3.14};
  static_assert(C4<p>::value == p);
}
```

### 出力
```
```


## 備考
- [Bug 97930 - `pair` is not a structural type](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=97930)
    - GCC 10では`pair`が構造的型とみなされないバグがある。GCC 11で修正済み


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 非型テンプレートパラメータの`auto`宣言](/lang/cpp17/declaring_non-type_template_arguments_with_auto.md)


## 参照
- [P0732R2 Class Types in Non-Type Template Parameters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0732r2.pdf)
- [P1907R1 Inconsistencies with non-type template parameters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1907r1.html)