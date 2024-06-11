# length
* regex[meta header]
* std[meta namespace]
* sub_match[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
difference_type length() const;
```

## 概要
マッチした文字列の長さを返す。


## 戻り値
`matched ?` [`distance`](../../iterator/distance.md)`(first, second) : 0`


## 例
```cpp example
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
* length()[color ff0000]
* std::regex[link ../basic_regex.md]
* std::smatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* std::ssub_match[link ../sub_match.md]

### 出力
```
3
0
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
