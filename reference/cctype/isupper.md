# isupper
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int isupper(int ch);
}
```


## 概要
`ch` が大文字かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が大文字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "isupper('A') = " << std::isupper('A') << std::endl
              << "isupper('a') = " << std::isupper('a') << std::endl
              << "isupper('Z') = " << std::isupper('Z') << std::endl
              << "isupper('z') = " << std::isupper('z') << std::endl
              << "isupper('3') = " << std::isupper('3') << std::endl
              << "isupper('.') = " << std::isupper('.') << std::endl
              << "isupper(' ') = " << std::isupper(' ') << std::endl
              << "isupper('\\n') = " << std::isupper('\n') << std::endl
              << "isupper('0x0f') = " << std::isupper(15) << std::endl;
}
```
* std::isupper[color ff0000]


## 出力例
```
isupper('A') = 256
isupper('a') = 0
isupper('Z') = 256
isupper('z') = 0
isupper('3') = 0
isupper('.') = 0
isupper(' ') = 0
isupper('\n') = 0
isupper('0x0f') = 0
```
