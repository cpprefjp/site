# operator<=>
* string_view[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class charT, class traits>
  constexpr see below
    operator<=>(basic_string_view<charT, traits> x,
                basic_string_view<charT, traits> y) noexcept; // (1) C++20
  template<class charT, class traits>
  constexpr see below
    operator<=>(basic_string_view<charT, traits> x,
                type_identity_t<basic_string_view<charT, traits>> y) noexcept; // (1) C++26
}
```
* type_identity_t[link /reference/type_traits/type_identity.md]

## 概要
`basic_string_view`オブジェクトの三方比較を行う。


## 適格要件
戻り値の型`R`（`traits::comparison_category`が存在すればその型）が、比較カテゴリ型（[`strong_ordering`](/reference/compare/strong_ordering.md)・[`weak_ordering`](/reference/compare/weak_ordering.md)・[`partial_ordering`](/reference/compare/partial_ordering.md)のいずれか）であること。満たさない場合、この演算子の使用はプログラムを不適格とする。


## 戻り値
戻り値の型`R`は、`traits::comparison_category`が存在していればその型、そうでなければ[`weak_ordering`](/reference/compare/weak_ordering.md)となり、以下と等価：


```cpp
return static_cast<R>(x.compare(y) <=> 0);
```
* compare[link compare.md]


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view a = "aaa";
  std::string_view b {"aaaBB", 3}; // 先頭3文字を参照

  if ((a <=> b) == 0) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```

### 出力
```
equal
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [LWG Issue 3950. `std::basic_string_view` comparison operators are overspecified](https://cplusplus.github.io/LWG/issue3950)
    - C++26で、第2引数が`type_identity_t`で包まれ、`basic_string_view`へ暗黙変換可能な型と直接比較できるようになった（追加の比較オーバーロードの規定が不要になった）
- [LWG Issue 3432. Missing requirement for `comparison_category`](https://cplusplus.github.io/LWG/issue3432)
    - C++23で、戻り値型`R`が比較カテゴリ型でなければならないという要件（Mandates）が追加され、`traits::comparison_category`が妥当な型を示す場合にのみ使われることが明確化された
