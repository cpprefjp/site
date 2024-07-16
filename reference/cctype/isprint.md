# isprint
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int isprint(int ch);
}
```


## 概要
`ch` が表示文字かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が表示文字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "isprint('A') = " << std::isprint('A') << std::endl
              << "isprint('a') = " << std::isprint('a') << std::endl
              << "isprint('Z') = " << std::isprint('Z') << std::endl
              << "isprint('z') = " << std::isprint('z') << std::endl
              << "isprint('3') = " << std::isprint('3') << std::endl
              << "isprint('.') = " << std::isprint('.') << std::endl
              << "isprint(' ') = " << std::isprint(' ') << std::endl
              << "isprint('\\n') = " << std::isprint('\n') << std::endl
              << "isprint('0x0f') = " << std::isprint(15) << std::endl;
}
```
* std::isprint[color ff0000]


## 出力例
```
isprint('A') = 16384
isprint('a') = 16384
isprint('Z') = 16384
isprint('z') = 16384
isprint('3') = 16384
isprint('.') = 16384
isprint(' ') = 16384
isprint('\n') = 0
isprint('0x0f') = 0
```
