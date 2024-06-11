# permissions
* filesystem[meta header]
* std::filesystem[meta namespace]
* file_status[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void permissions(perms prms) noexcept; // (1)
perms permissions() const noexcept;    // (2)
```
* perms[link /reference/filesystem/perms.md]

## 概要
ファイル権限を設定・取得する。


## 効果
- (1) : ファイル権限`prms`を`*this`に設定する
- (2) : 設定されているファイル権限を戻り値として返す


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

  status.permissions(fs::perms::owner_write);
  assert((status.permissions() & fs::perms::owner_write) == fs::perms::owner_write);
}
```
* status.permissions[color ff0000]
* fs::perms[link /reference/filesystem/perms.md]

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
