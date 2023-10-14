# operator<=
* string[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class CharT, class Traits, class Allocator>
  bool
    operator<=(const basic_string<CharT, Traits, Allocator>& a,
               const basic_string<CharT, Traits, Allocator>& b);          // (1) C++03
  template <class CharT, class Traits, class Allocator>
  bool
    operator<=(const basic_string<CharT, Traits, Allocator>& a,
               const basic_string<CharT, Traits, Allocator>& b) noexcept; // (1) C++14
  template <class CharT, class Traits, class Allocator>
  constexpr bool
    operator<=(const basic_string<CharT, Traits, Allocator>& a,
               const basic_string<CharT, Traits, Allocator>& b) noexcept; // (1) C++20

  template <class CharT, class Traits, class Allocator>
  bool
    operator<=(const CharT* a,
               const basic_string<CharT, Traits, Allocator>& b); // (2) C++03
  template <class CharT, class Traits, class Allocator>
  constexpr bool
    operator<=(const CharT* a,
               const basic_string<CharT, Traits, Allocator>& b); // (2) C++20

  template <class CharT, class Traits, class Allocator>
  bool
    operator<=(const basic_string<CharT, Traits, Allocator>& a,
               const CharT* b);                                // (3) C++03
  template <class CharT, class Traits, class Allocator>
  constexpr bool
    operator<=(const basic_string<CharT, Traits, Allocator>& a,
               const CharT* b);                                // (3) C++20
}
```

## 概要
`basic_string`において、左辺が右辺以下かの判定を行う。


## 戻り値
- (1) `a.`[`compare`](compare.md)`(b) <= 0`
- (2) `b.`[`compare`](compare.md)`(a) >= 0`
- (3) `a.`[`compare`](compare.md)`(b) <= 0`


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string a = "aaa";
  std::string b = "bbb";

  std::cout << std::boolalpha;
  std::cout << (a <= b) << std::endl;
}
```

### 出力
```
true
```

## 参照
- [LWG2064 - More `noexcept` issues in `basic_string`](https://wg21.cmeerw.net/lwg/issue2064)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
