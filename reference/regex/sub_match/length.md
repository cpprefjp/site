#length (C++11)
* regex[meta header]
* std[meta namespace]
* sub_match[meta class]

```cpp
difference_type length() const;
```

##概要
マッチした文字列の長さを返す。


##戻り値
`matched ? `[`distance`](../../iterator/distance.md)`(first, second) : 0`


##例
```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
  const std::string s("123");
  const std::regex re(R"(\d+)");
  std::smatch m;
  if (std::regex_search(s, m, re)) {
    std::ssub_match sub = m[0];
    if (sub.matched) {
      std::cout << sub.length() << std::endl;
      sub.matched = false;
      std::cout << sub.length() << std::endl;
    } else {
      std::cout << "not participate" << std::endl;
    }
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* length[color ff0000]
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]
* string[link ../../string.md]
* smatch[link ../match_results.md]
* regex_search[link ../regex_search.md]
* ssub_match[link ../sub_match.md]

###出力
```
3
0
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
