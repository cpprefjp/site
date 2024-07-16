# operator<
* string_view[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class CharT, class Traits>
  constexpr bool operator<(basic_string_view<CharT, Traits> x,
                           basic_string_view<CharT, Traits> y) noexcept; // (1) C++17
}
```

## 概要
`basic_string_view`オブジェクトにおいて、左辺が右辺より小さいかの判定を行う。


## 戻り値
```cpp
return x.compare(y) < 0;
```
* compare[link compare.md]


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view a = "aaa";
  std::string_view b = "bbb";

  if (a < b) {
    std::cout << "less" << std::endl;
  }
  else {
    std::cout << "greater equal" << std::endl;
  }
}
```

### 出力例
```
less
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
