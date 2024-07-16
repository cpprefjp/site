# operator==
* string[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits, class Allocator>
  bool
    operator==(const basic_string<CharT, Traits, Allocator>& a,
               const basic_string<CharT, Traits, Allocator>& b);          // (1) C++03
  template <class CharT, class Traits, class Allocator>
  bool
    operator==(const basic_string<CharT, Traits, Allocator>& a,
               const basic_string<CharT, Traits, Allocator>& b) noexcept; // (1) C++14
  template <class CharT, class Traits, class Allocator>
  constexpr bool
    operator==(const basic_string<CharT, Traits, Allocator>& a,
               const basic_string<CharT, Traits, Allocator>& b) noexcept; // (1) C++20

  template <class CharT, class Traits, class Allocator>
  bool
    operator==(const basic_string<CharT, Traits, Allocator>& a,
               const CharT* b);                                  // (2) C++03
  template <class CharT, class Traits, class Allocator>
  constexpr bool
    operator==(const basic_string<CharT, Traits, Allocator>& a,
               const CharT* b);                                  // (2) C++20

  // (2)により、以下の演算子が使用可能になる (C++20)
  template <class CharT, class Traits, class Allocator>
  bool
    operator==(const CharT* a,
               const basic_string<CharT, Traits, Allocator>& b); // (3) C++03
  template <class CharT, class Traits, class Allocator>
  constexpr bool
    operator==(const CharT* a,
               const basic_string<CharT, Traits, Allocator>& b); // (3) C++20
}
```

## 概要
`basic_string`オブジェクトの等値比較を行う。

デフォルトの比較では、大文字と小文字は区別される（`'a' == 'A'`は`false`）。  
なお、この比較方法は[`char_traits`](/reference/string/char_traits.md)によってカスタマイズでき、大文字・小文字を区別しない比較もできる。


## 事前条件
- (2) パラメータ`b`が、[`Traits::length`](/reference/string/char_traits/length.md)`(b) + 1`の要素数を持つ`CharT`文字型の配列を指していること


## 戻り値
- (1) `a.`[`compare`](compare.md)`(b) == 0`
- (2) `a.`[`compare`](compare.md)`(b) == 0`
- (3) `b == a`


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string a = "abc";
  std::string b = "abc";

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

## 参照
- [LWG2064 - More `noexcept` issues in `basic_string`](https://wg21.cmeerw.net/lwg/issue2064)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
