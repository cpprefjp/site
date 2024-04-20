# isspace
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int isspace(int ch);
}
```


## 概要
`ch` が空白文字かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が空白文字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "isspace('A') = " << std::isspace('A') << std::endl
              << "isspace('a') = " << std::isspace('a') << std::endl
              << "isspace('Z') = " << std::isspace('Z') << std::endl
              << "isspace('z') = " << std::isspace('z') << std::endl
              << "isspace('3') = " << std::isspace('3') << std::endl
              << "isspace('.') = " << std::isspace('.') << std::endl
              << "isspace(' ') = " << std::isspace(' ') << std::endl
              << "isspace('\\n') = " << std::isspace('\n') << std::endl
              << "isspace('0x0f') = " << std::isspace(15) << std::endl;
}
```
* std::isspace[color ff0000]


## 出力例
```
isspace('A') = 0
isspace('a') = 0
isspace('Z') = 0
isspace('z') = 0
isspace('3') = 0
isspace('.') = 0
isspace(' ') = 8192
isspace('\n') = 8192
isspace('0x0f') = 0
```
