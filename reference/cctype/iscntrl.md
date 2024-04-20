# iscntrl
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int iscntrl(int ch);
}
```


## 概要
`ch` が制御文字かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が制御文字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "iscntrl('A') = " << std::iscntrl('A') << std::endl
              << "iscntrl('a') = " << std::iscntrl('a') << std::endl
              << "iscntrl('Z') = " << std::iscntrl('Z') << std::endl
              << "iscntrl('z') = " << std::iscntrl('z') << std::endl
              << "iscntrl('3') = " << std::iscntrl('3') << std::endl
              << "iscntrl('.') = " << std::iscntrl('.') << std::endl
              << "iscntrl(' ') = " << std::iscntrl(' ') << std::endl
              << "iscntrl('\\n') = " << std::iscntrl('\n') << std::endl
              << "iscntrl('0x0f') = " << std::iscntrl(15) << std::endl;
}
```
* std::iscntrl[color ff0000]


## 出力例
```
iscntrl('A') = 0
iscntrl('a') = 0
iscntrl('Z') = 0
iscntrl('z') = 0
iscntrl('3') = 0
iscntrl('.') = 0
iscntrl(' ') = 0
iscntrl('\n') = 2
iscntrl('0x0f') = 2
```
