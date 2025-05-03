# tolower
* cctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int tolower(int ch);
}
```


## 概要
`ch` を小文字に変換する（変換はロケールの影響を受ける）。


## 戻り値
`ch` に小文字があれば、小文字化した `ch`。小文字がなければ `ch`。


## 例
```cpp example
#include <cctype>
#include <iostream>

int main() {
    std::cout << "tolower('A') = " << static_cast<char>(std::tolower('A')) << std::endl
              << "tolower('a') = " << static_cast<char>(std::tolower('a')) << std::endl
              << "tolower('1') = " << static_cast<char>(std::tolower('1')) << std::endl
              << "tolower('.') = " << static_cast<char>(std::tolower('.')) << std::endl
              << "tolower('$') = " << static_cast<char>(std::tolower('$')) << std::endl;
}
```
* std::tolower[color ff0000]


## 出力例
```
tolower('A') = a
tolower('a') = a
tolower('1') = 1
tolower('.') = .
tolower('$') = $
```

## 実装例(ASCII互換文字コードの場合)
```cpp
int tolower(int ch) {
  if (isupper(ch)) {
    ch ^= 32
  }
  return ch;
}
```

