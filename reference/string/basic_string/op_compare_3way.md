# operator<=>
* string[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT, class traits, class Allocator>
    see below
  operator<=>(const basic_string<charT, traits, Allocator>& lhs,
              const basic_string<charT, traits, Allocator>& rhs) noexcept; // (1) C++20

  template <class charT, class traits, class Allocator>
    see below
  operator<=>(const basic_string<charT, traits, Allocator>& lhs,
              const charT* rhs);                                           // (2) C++20
}
```
* see below[italic]

## 概要
`basic_string`オブジェクトの三方比較を行う。

デフォルトの比較では、大文字と小文字は区別される（`'a' == 'A'`は`false`）。  
なお、この比較方法は[`char_traits`](/reference/string/char_traits.md)によってカスタマイズでき、大文字・小文字を区別しない比較もできる。


## 戻り値
以下と等価：

```cpp
return basic_string_view<charT, traits>(lhs) <=> basic_string_view<charT, traits>(rhs);
```

戻り値の型は、`traits::comparison_category`が存在していればその型、そうでなければ[`weak_ordering`](/reference/compare/weak_ordering.md)となる。


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string a = "abc";
  std::string b = "abc";

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

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
