# operator==
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool operator==(const directory_entry& rhs) const noexcept;
```

## 概要
`directory_entry`オブジェクトを�値比較する。


## 戻り値
```cpp
return path() == rhs.path();
```
* path()[link path.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::directory_entry x{"a.txt"};
  fs::directory_entry y{"a.txt"};

  if (x == y) {
    std::cout << "equal" << std::endl;
  }
}
```

### 出力
```
equal
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
