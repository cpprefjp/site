# islower
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int islower(int ch);
}
```


## 概要
`ch` が小文字かどうかを判定する（判定はロケールの影響を受ける）。


## 戻り値
`ch` が小文字と判定されれば非ゼロを、そうでなければゼロを返す。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "islower('A') = " << std::islower('A') << std::endl
              << "islower('a') = " << std::islower('a') << std::endl
              << "islower('Z') = " << std::islower('Z') << std::endl
              << "islower('z') = " << std::islower('z') << std::endl
              << "islower('3') = " << std::islower('3') << std::endl
              << "islower('.') = " << std::islower('.') << std::endl
              << "islower(' ') = " << std::islower(' ') << std::endl
              << "islower('\\n') = " << std::islower('\n') << std::endl
              << "islower('0x0f') = " << std::islower(15) << std::endl;
}
```
* std::islower[color ff0000]


## 出力例
```
islower('A') = 0
islower('a') = 512
islower('Z') = 0
islower('z') = 512
islower('3') = 0
islower('.') = 0
islower(' ') = 0
islower('\n') = 0
islower('0x0f') = 0
```

## 実装例
```cpp
int islower(int ch) {
  return ch >= 'a' && ch <= 'z';
}
```

