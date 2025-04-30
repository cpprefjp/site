# isalnum
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int isalnum(int ch);
}
```


## 概要
`ch` が英数字かどうかを判定する（判定はロケールの影響を受ける）。

`isalnum` は、`isalpha(ch) || isdigit(ch)` と等価である。つまり、英字（`isalpha`）または数字（`isdigit`）であれば `true` となる。


## 戻り値
`ch` が英数字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "isalnum('A') = " << std::isalnum('A') << std::endl
              << "isalnum('a') = " << std::isalnum('a') << std::endl
              << "isalnum('Z') = " << std::isalnum('Z') << std::endl
              << "isalnum('z') = " << std::isalnum('z') << std::endl
              << "isalnum('3') = " << std::isalnum('3') << std::endl
              << "isalnum('.') = " << std::isalnum('.') << std::endl
              << "isalnum(' ') = " << std::isalnum(' ') << std::endl
              << "isalnum('\\n') = " << std::isalnum('\n') << std::endl
              << "isalnum('0x0f') = " << std::isalnum(15) << std::endl;
}
```
* std::isalnum[color ff0000]


## 出力例
```
isalnum('A') = 8
isalnum('a') = 8
isalnum('Z') = 8
isalnum('z') = 8
isalnum('3') = 8
isalnum('.') = 0
isalnum(' ') = 0
isalnum('\n') = 0
isalnum('0x0f') = 0
```

## 実装例
```cpp
int isalnum(int ch) {
  return isalpha(ch) || isdigit(ch);
}
```
