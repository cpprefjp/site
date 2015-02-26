#swap (C++11)
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]

```cpp
void swap(basic_regex& e);
```
* basic_regex[link ../basic_regex.md]

##概要
正規表現オブジェクトを交換する。


##効果
`*this` と `e` の 2 つの正規表現オブジェクトの内容を交換する。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <regex>

void print(const std::regex& re)
{
  const char s[] = " abc 123 def ";
  std::cmatch m;
  std::regex_search(s, m, re);
  std::cout << "ready:" << std::boolalpha << m.ready() << std::endl;
  if (m.ready()) {
    std::cout << "prefix:'" << m.prefix() << '\'' << std::endl;
    for (std::size_t i = 0, n = m.size(); i < n; ++i) {
      std::cout << i << ":'" << m.str(i) << "', position = " << m.position(i) << std::endl;
    }
    std::cout << "suffix:'" << m.suffix() << '\'' << std::endl;
  }
  std::cout << std::endl;
}

int main()
{
  std::regex re1("\\w+");
  std::regex re2("\\d+");

  // swap 前
  print(re1);
  print(re2);

  re1.swap(re2);

  // swap 後
  print(re1);
  print(re2);
}
```
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]
* swap[color ff0000]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* boolalpha[link ../../ios/boolalpha.md]
* cmatch[link ../match_results.md]
* regex_search[link ../regex_search.md]
* prefix[link ../match_results/prefix.md]
* suffix[link ../match_results/suffix.md]
* str[link ../match_results/str.md]
* position[link ../match_results/position.md]
* size[link ../match_results/size.md]
* ready[link ../match_results/ready.md]

###出力
```
ready:true
prefix:' '
0:'abc', position = 1
suffix:' 123 def '

ready:true
prefix:' abc '
0:'123', position = 5
suffix:' def '

ready:true
prefix:' abc '
0:'123', position = 5
suffix:' def '

ready:true
prefix:' '
0:'abc', position = 1
suffix:' 123 def '
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
