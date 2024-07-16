# isalpha
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int isalpha(int ch);
}
```


## 概要
`ch` が英文字かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が英文字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "isalpha('A') = " << std::isalpha('A') << std::endl
              << "isalpha('a') = " << std::isalpha('a') << std::endl
              << "isalpha('Z') = " << std::isalpha('Z') << std::endl
              << "isalpha('z') = " << std::isalpha('z') << std::endl
              << "isalpha('3') = " << std::isalpha('3') << std::endl
              << "isalpha('.') = " << std::isalpha('.') << std::endl
              << "isalpha(' ') = " << std::isalpha(' ') << std::endl
              << "isalpha('\\n') = " << std::isalpha('\n') << std::endl
              << "isalpha('0x0f') = " << std::isalpha(15) << std::endl;
}
```
* std::isalpha[color ff0000]


## 出力例
```
isalpha('A') = 1024
isalpha('a') = 1024
isalpha('Z') = 1024
isalpha('z') = 1024
isalpha('3') = 0
isalpha('.') = 0
isalpha(' ') = 0
isalpha('\n') = 0
isalpha('0x0f') = 0
```
