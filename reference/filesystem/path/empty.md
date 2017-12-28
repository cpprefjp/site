# empty
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool empty() const noexcept;
```

## 概要
パスが空か判定する。


## 戻り値
汎用フォーマットとしてのパスが空であれば`true`、そうでなければ`false`を返す。


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p1;
  if (p1.empty()) {
    std::cout << "p1 : empty" << std::endl;
  }

  fs::path p2 = "/usr/bin/clang";
  if (!p2.empty()) {
    std::cout << "p2 : not empty" << std::endl;
  }
}
```
* empty()[color ff0000]

### 出力
```
p1 : empty
p2 : not empty
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
