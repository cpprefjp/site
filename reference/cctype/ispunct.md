# ispunct
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int ispunct(int ch);
}
```


## 概要
`ch` が区切り文字かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が区切り文字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "ispunct('A') = " << std::ispunct('A') << std::endl
              << "ispunct('a') = " << std::ispunct('a') << std::endl
              << "ispunct('Z') = " << std::ispunct('Z') << std::endl
              << "ispunct('z') = " << std::ispunct('z') << std::endl
              << "ispunct('3') = " << std::ispunct('3') << std::endl
              << "ispunct('.') = " << std::ispunct('.') << std::endl
              << "ispunct(' ') = " << std::ispunct(' ') << std::endl
              << "ispunct('\\n') = " << std::ispunct('\n') << std::endl
              << "ispunct('0x0f') = " << std::ispunct(15) << std::endl;
}
```
* std::ispunct[color ff0000]


## 出力例
```
ispunct('A') = 0
ispunct('a') = 0
ispunct('Z') = 0
ispunct('z') = 0
ispunct('3') = 0
ispunct('.') = 4
ispunct(' ') = 0
ispunct('\n') = 0
ispunct('0x0f') = 0
```
