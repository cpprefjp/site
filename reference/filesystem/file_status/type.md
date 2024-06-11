# type
* filesystem[meta header]
* std::filesystem[meta namespace]
* file_status[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void type(file_type ft) noexcept; // (1)
file_type type() const noexcept;  // (2)
```
* file_type[link /reference/filesystem/file_type.md]

## 概要
ファイル種別を設定・取得する。


## 効果
- (1) : ファイル種別`ft`を`*this`に設定する
- (2) : 設定されているファイル種別を戻り値として返す


## 例外
- (1), (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::file_status status;

  status.type(fs::file_type::regular);
  assert(status.type() == fs::file_type::regular);
}
```
* status.type[color ff0000]
* fs::file_type[link /reference/filesystem/file_type.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
