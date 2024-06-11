# operator<<
* string_view[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits>
  std::basic_ostream<CharT, Traits>&
    operator<<(std::basic_ostream<CharT, Traits>& os, std::basic_string_view<CharT, Traits> sv);
}
```

## 概要
文字列をストリームへ出力する。

## 効果
イテレータ範囲`[sv.`[`begin()`](begin.md)`, sv.`[`end()`](end.md)`)`の文字を`os`に出力する。


## 戻り値
`os`


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view sv = "Hello World";

  std::cout << sv << std::endl;
  std::cout << sv.substr(0, 5) << std::endl;
}
```
* sv.substr[link substr.md]

### 出力例
```
Hello World
Hello
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
