# status_known
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool status_known(file_status s) noexcept;
}
```
* file_status[link file_status.md]

## 概要
ファイルが既知の状態かを確認する。


## 戻り値
```cpp
return s.type() != file_type::none;
```
* s.type()[link file_status/type.md]
* file_type::none[link file_type.md]


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};

  assert(fs::status_known(fs::status("regular.txt")));
  assert(fs::status_known(fs::status("not_found.txt")));

  assert(!fs::status_known(fs::file_status{}));
}
```
* fs::status_known[color ff0000]
* fs::status[link status.md]
* fs::file_status[link file_status.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
