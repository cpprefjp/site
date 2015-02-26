#operator<=
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
template <class CharT, class Traits, class Allocator>
bool operator<=(const basic_string<CharT, Traits, Allocator>& a,
                const basic_string<CharT, Traits, Allocator>& b) noexcept; // (1)

template <class CharT, class Traits, class Allocator>
bool operator<=(const CharT* a,
                const basic_string<CharT, Traits, Allocator>& b) noexcept; // (2)

template <class CharT, class Traits, class Allocator>
bool operator<=(const basic_string<CharT, Traits, Allocator>& a,
                const CharT* rhs) noexcept;                                // (3)
```

##概要
`basic_string`において、左辺が右辺以下かの判定を行う。


##戻り値
- (1) `a.`[`compare`](./compare.md)`(b) <= 0`
- (2) `b.`[`compare`](./compare.md)`(a) >= 0`
- (3) `a.`[`compare`](./compare.md)`(b) <= 0`


##例
```cpp
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

###出力
```
true
```

##参照
