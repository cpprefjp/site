# clear
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void clear() noexcept;
```

## 概要
パスを空にする。


## 事後条件
```cpp
empty() == true
```
* empty()[link empty.md]


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  p.clear();
  if (p.empty()) {
    std::cout << "cleared" << std::endl;
  }
}
```
* clear()[color ff0000]
* p.empty()[link empty.md]

### 出力
```
cleared
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
