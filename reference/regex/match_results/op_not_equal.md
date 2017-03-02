#operator!=
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BidirectinalIterator, class Allocator>
  bool operator!=(const match_results<BidirectionalIterator, Allocator>& m1,
                  const match_results<BidirectionalIterator, Allocator>& m2);
}
```

##概要
`match_results` オブジェクトを非等値比較する。


##戻り値
- `!(m1` [`==`](op_equal.md) `m2)`


##例
```cpp
#include <iostream>
#include <regex>

int main()
{
  const char s[] = "abc 012 def";

  const std::regex re1(R"((\w+)\s+(\d+)\s+(\w+))");
  std::cmatch m1;
  std::regex_search(s, m1, re1);
  for (auto&& sub : m1) {
    std::cout << sub << std::endl;
  }
  std::cout << std::endl;

  const std::regex re2(R"((\w*) (\w*) (\w*))");
  std::cmatch m2;
  std::regex_search(s, m2, re2);
  for (auto&& sub : m2) {
    std::cout << sub << std::endl;
  }
  std::cout << std::endl;

  std::cout << std::boolalpha << (m1 != m2) << std::endl;
}
```
* !=[color ff0000]
* std::regex[link ../basic_regex.md]
* std::regex_search[link ../regex_search.md]
* std::cmatch[link ../match_results.md]

###出力
```
abc 012 def
abc
012
def

abc 012 def
abc
012
def

false
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
