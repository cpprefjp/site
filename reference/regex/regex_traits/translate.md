# translate
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
char_type translate(char_type c) const;
```


## 概要
与えられた文字と等価の文字を取得する。


## 戻り値
```cpp
(c)
```


## 例
```cpp example
#include <iostream>
#include <regex>

int main()
{
  std::regex_traits<char> traits;

  char c = traits.translate('A');
  std::cout << c << std::endl;
}
```
* translate[color ff0000]

### 出力
```
A
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
