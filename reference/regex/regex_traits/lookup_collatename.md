#lookup_collatename (C++11)
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]

```cpp
template <class ForwardIterator>
string_type lookup_collatename(
                ForwardIterator first,
                ForwardIterator last) const;
```

##概要
与えられた文字の範囲`[first, last)`に対応する照合名を取得する。



##例
```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
  std::regex_traits<char> traits;
    
  // tilde(チルダ、~記号)の照合名を取得する
  std::string input = "tilde";
  std::string result = traits.lookup_collatename(input.begin(), input.end());

  std::cout << result << std::endl;
}
```
* std::string[link /reference/string/basic_string.md]
* begin()[link /reference/string/basic_string/begin.md]
* end()[link /reference/string/basic_string/end.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
~
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

