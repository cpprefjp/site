# toupper
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int toupper(int ch);
}
```


## 概要
`ch` を大文字に変換する（変換はロケールの影響を受ける）。


## 戻り値
`ch` に大文字があれば、大文字化した `ch`。大文字がなければ `ch`。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "toupper('A') = " << static_cast<char>(std::toupper('A')) << std::endl
              << "toupper('a') = " << static_cast<char>(std::toupper('a')) << std::endl
              << "toupper('1') = " << static_cast<char>(std::toupper('1')) << std::endl
              << "toupper('.') = " << static_cast<char>(std::toupper('.')) << std::endl
              << "toupper('$') = " << static_cast<char>(std::toupper('$')) << std::endl;
}
```
* std::toupper[color ff0000]


## 出力例
```
toupper('A') = A
toupper('a') = A
toupper('1') = 1
toupper('.') = .
toupper('$') = $
```
