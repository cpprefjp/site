# length
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static std::size_t length(const char_type* p);
```


## 概要
文字列の長さを取得する。


## 戻り値
```cpp
char_traits<char_type>::length(p)
```
* char_traits[link /reference/string/char_traits.md]
* length[link /reference/string/char_traits/length.md]


## 例
```cpp example
#include <regex>
#include <iostream>

int main()
{
  std::size_t length = std::regex_traits<char>::length("hello");
  std::cout << length << std::endl;
}
```
* length("hello")[color ff0000]

### 出力
```
5
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
