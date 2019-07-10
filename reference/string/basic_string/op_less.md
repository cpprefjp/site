# operator<
* string[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits, class Allocator>
  bool operator<(const basic_string<CharT, Traits, Allocator>& a,
                 const basic_string<CharT, Traits, Allocator>& b); // (1) C++03

  template <class CharT, class Traits, class Allocator>
  bool operator<(const basic_string<CharT, Traits, Allocator>& a,
                 const basic_string<CharT, Traits, Allocator>& b) noexcept; // (1) C++14

  template <class CharT, class Traits, class Allocator>
  bool operator<(const CharT* a,
                 const basic_string<CharT, Traits, Allocator>& b);          // (2)

  template <class CharT, class Traits, class Allocator>
  bool operator<(const basic_string<CharT, Traits, Allocator>& a,
                 const CharT* rhs) noexcept;                                // (3)
}
```

## 概要
`basic_string`において、左辺が右辺より小さいかの判定を行う。

## 戻り値
- (1) `a.`[`compare`](compare.md)`(b) < 0`
- (2) `b.`[`compare`](compare.md)`(a) > 0`
- (3) `a.`[`compare`](compare.md)`(b) < 0`


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string a = "aaa";
  std::string b = "bbb";

  std::cout << std::boolalpha;
  std::cout << (a < b) << std::endl;
}
```

### 出力
```
true
```

## 参照
- [LWG2064 - More `noexcept` issues in `basic_string`](https://wg21.cmeerw.net/lwg/issue2064)
