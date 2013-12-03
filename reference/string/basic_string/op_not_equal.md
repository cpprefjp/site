#operator!=
```cpp
template <class CharT, class Traits, class Allocator>
bool operator!=(const basic_string<CharT, Traits, Allocator>& a,
                const basic_string<CharT, Traits, Allocator>& b); // (1)

template <class CharT, class Traits, class Allocator>
bool operator!=(const charT* a,
                const basic_string<CharT, Traits, Allocator>& b); // (2)

template <class CharT, class Traits, class Allocator>
bool operator!=(const basic_string<CharT, Traits, Allocator>& a,
                const charT* b);                                  // (3)
```

##概要
`basic_string`オブジェクトの非等値比較を行う。


##要件
- (3) パラメータ`b`が、[`Traits::length`](/reference/string/char_traits/length.md)`(b) + 1`の要素数を持つ`CharT`文字型の配列を指していること


##戻り値
- (1) `!(a == b)`
- (2) `b != a`
- (3) `a.`[`compare`](./compare.md)`(b) != 0`


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string a = "abc";
  std::string b = "abcd";

  if (a != b) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```

###出力
```
not equal
```

##参照
