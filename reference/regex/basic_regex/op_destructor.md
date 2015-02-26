#デストラクタ (C++11)
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* function[meta id-type]

```cpp
~basic_regex();
```


##概要
正規表現オブジェクトを破棄する。


##効果
正規表現オブジェクトを破棄する。


##例
```cpp
#include <iostream>
#include <regex>

int main()
{
  const char s[] = " abc ";
  std::cout << std::boolalpha;

  const std::regex re("ABC", std::regex_constants::icase);
  std::cout << std::regex_search(s, re) << std::endl;

  // スコープの終わりで破棄される。
}
```
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* boolalpha[link ../../ios/boolalpha.md]
* regex_search[link ../regex_search.md]
* regex_constants[link ../regex_constants.md.nolink]

###出力
```
true
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
