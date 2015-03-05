#operator==
* string[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits, class Allocator>
  bool operator==(const basic_string<CharT, Traits, Allocator>& a,
                  const basic_string<CharT, Traits, Allocator>& b); // (1) C++11
  
  template <class CharT, class Traits, class Allocator>
  bool operator==(const basic_string<CharT, Traits, Allocator>& a,
                  const basic_string<CharT, Traits, Allocator>& b) noexcept; // (1) C++14
  
  template <class CharT, class Traits, class Allocator>
  bool operator==(const CharT* a,
                  const basic_string<CharT, Traits, Allocator>& b); // (2)
  
  template <class CharT, class Traits, class Allocator>
  bool operator==(const basic_string<CharT, Traits, Allocator>& a,
                  const CharT* b);                                  // (3)
}
```

##概要
`basic_string`オブジェクトの等値比較を行う。


##要件
- (3) パラメータ`b`が、[`Traits::length`](/reference/string/char_traits/length.md)`(b) + 1`の要素数を持つ`CharT`文字型の配列を指していること


##戻り値
- (1) `a.`[`compare`](./compare.md)`(b) == 0`
- (2) `b == a`
- (3) `a.`[`compare`](./compare.md)`(b) == 0`


##例
```cpp
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

###出力
```
equal
```

##参照
- [LWG2064 - More noexcept issues in basic_string](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2064)
