#length (C++11)
* regex[meta header]
* std[meta namespace]

```cpp
difference_type length(size_type sub = 0) const;
```

##概要
指定されたサブマッチが指す文字列の長さを返す。


##要件
[`ready`](ready.md)`() == true`


##戻り値
`(*this)[sub].`[`length`](../sub_match/length.md)`()`


##例
```cpp
#include <iostream>
#include <regex>

int main()
{
  const char s[] = " abc 0123 defgh ";
  const std::regex re("(\\w+) (\\d+) (\\w+)");

  std::cmatch m;
  if (std::regex_search(s, m, re)) {
    std::cout << "str() = '" << m.str() << "', length() = " << m.length() << std::endl;
    for (std::size_t i = 0, n = m.size(); i < n; ++i) {
      std::cout << "str(" << i << ") = '" << m.str(i) << "', length(" << i << ") = " << m.length(i) << std::endl;
    }
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]
* cmatch[link ../match_results.md]
* regex_search[link ../regex_search.md]
* size[link size.md]
* str[link str.md]
* length[color ff0000]

###出力
```
str() = 'abc 0123 defgh', length() = 14
str(0) = 'abc 0123 defgh', length(0) = 14
str(1) = 'abc', length(1) = 3
str(2) = '0123', length(2) = 4
str(3) = 'defgh', length(3) = 5
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
