# isblank
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int isblank(int ch);
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
    std::cout << "isblank('A') = " << std::isblank('A') << std::endl
              << "isblank('a') = " << std::isblank('a') << std::endl
              << "isblank('Z') = " << std::isblank('Z') << std::endl
              << "isblank('z') = " << std::isblank('z') << std::endl
              << "isblank('3') = " << std::isblank('3') << std::endl
              << "isblank('.') = " << std::isblank('.') << std::endl
              << "isblank(' ') = " << std::isblank(' ') << std::endl
              << "isblank('\\n') = " << std::isblank('\n') << std::endl
              << "isblank('0x0f') = " << std::isblank(15) << std::endl;
}
```
* std::isblank[color ff0000]


## 出力例
```
isblank('A') = 0
isblank('a') = 0
isblank('Z') = 0
isblank('z') = 0
isblank('3') = 0
isblank('.') = 0
isblank(' ') = 1
isblank('\n') = 0
isblank('0x0f') = 0
```

## 実装例
```cpp
int isblank(int ch) {
  return ch == ' ' || ch == '\t';
}
```
