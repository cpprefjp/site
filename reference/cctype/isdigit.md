# isdigit
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int isdigit(int ch);
}
```


## 概要
`ch` が数字かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が数字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "isdigit('A') = " << std::isdigit('A') << std::endl
              << "isdigit('a') = " << std::isdigit('a') << std::endl
              << "isdigit('Z') = " << std::isdigit('Z') << std::endl
              << "isdigit('z') = " << std::isdigit('z') << std::endl
              << "isdigit('3') = " << std::isdigit('3') << std::endl
              << "isdigit('.') = " << std::isdigit('.') << std::endl
              << "isdigit(' ') = " << std::isdigit(' ') << std::endl
              << "isdigit('\\n') = " << std::isdigit('\n') << std::endl
              << "isdigit('0x0f') = " << std::isdigit(15) << std::endl;
}
```
* std::isdigit[color ff0000]


## 出力例
```
isdigit('A') = 0
isdigit('a') = 0
isdigit('Z') = 0
isdigit('z') = 0
isdigit('3') = 1
isdigit('.') = 0
isdigit(' ') = 0
isdigit('\n') = 0
isdigit('0x0f') = 0
```

## 実装例
```cpp
int isdigit(int ch) {
  return ch >= '0' && ch <= '9';
}
```
