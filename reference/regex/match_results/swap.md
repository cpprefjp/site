#swap (C++11)
* regex[meta header]
* std[meta namespace]

```cpp
void swap(const match_results& that);
```

##概要
`match_results` オブジェクトの内容を交換する。


##効果
`*this` の内容と `that` の内容を交換する。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <regex>

int main()
{
  const char s[] = "abc 012 def";

  const std::regex re1(R"((\w+) (\d+))");
  std::cmatch m1;
  std::regex_search(s, m1, re1);
  for (auto&& sub : m1) {
    std::cout << sub << std::endl;
  }
  std::cout << std::endl;

  const std::regex re2(R"((\d+) (\w+))");
  std::cmatch m2;
  std::regex_search(s, m2, re2);
  for (auto&& sub : m2) {
    std::cout << sub << std::endl;
  }
  std::cout << std::endl;

  m1.swap(m2);

  for (auto&& sub : m1) {
    std::cout << sub << std::endl;
  }
  std::cout << std::endl;
  for (auto&& sub : m2) {
    std::cout << sub << std::endl;
  }
}
```
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]
* regex_search[link ../regex_search.md]
* cmatch[link ../match_results.md]
* cout[link ../../iostream/cout.md]
* boolalpha[link ../../ios/boolalpha.md]
* endl[link ../../ostream/endl.md]
* swap[color ff0000]

###出力
```
abc 012
abc
012

012 def
012
def

012 def
012
def

abc 012
abc
012
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
