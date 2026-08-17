# operator==
* string_view[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits>
  constexpr bool
    operator==(basic_string_view<CharT, Traits> x,
               basic_string_view<CharT, Traits> y) noexcept; // (1) C++17
  template <class CharT, class Traits>
  constexpr bool
    operator==(basic_string_view<CharT, Traits> x,
               type_identity_t<basic_string_view<CharT, Traits>> y) noexcept; // (1) C++26
}
```
* type_identity_t[link /reference/type_traits/type_identity.md]

## 概要
`basic_string_view`オブジェクトの等値比較を行う。


## 戻り値
```cpp
return x.compare(y) == 0;
```
* compare[link compare.md]


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`
- C++26では、第2引数が[`type_identity_t`](/reference/type_traits/type_identity.md)で包まれて非推論文脈となる。これにより、`basic_string_view`へ暗黙変換可能な型（[`basic_string`](/reference/string/basic_string.md)や文字列リテラルなど）と直接比較できるようになり、従来別途規定されていた追加の比較オーバーロードが不要になった。


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view a = "aaa";
  std::string_view b {"aaaBB", 3}; // 先頭3文字を参照

  if (a == b) {
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
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [LWG Issue 3950. `std::basic_string_view` comparison operators are overspecified](https://cplusplus.github.io/LWG/issue3950)
    - C++26で、比較演算子の第2引数が`type_identity_t`で包まれ、追加の比較オーバーロードの規定が不要になった
