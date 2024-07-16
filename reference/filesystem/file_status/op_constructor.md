# コンストラクタ
* filesystem[meta header]
* std::filesystem[meta namespace]
* file_status[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
file_status() noexcept;                                     // (1)

explicit file_status(file_type ft,
                     perms prms = perms::unknown) noexcept; // (2)
```
* file_type[link /reference/filesystem/file_type.md]
* perms[link /reference/filesystem/perms.md]


## 概要
`file_status`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。
    - ファイル種別として[`file_type::none`](/reference/filesystem/file_type.md)、ファイル権限として[`perms::unknown`](/reference/filesystem/perms.md)を状態として保持する
- (2) : ファイル種別として`ft`、ファイル権限として`prms`を保持する


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::file_status status1;
  assert(status1.type() == fs::file_type::none);
  assert((status1.permissions() & fs::perms::unknown) == fs::perms::unknown);

  fs::file_status status2 {
    fs::file_type::regular,
    fs::perms::owner_read | fs::perms::owner_write
  };
  assert(status2.type() == fs::file_type::regular);
  assert((status2.permissions() & fs::perms::owner_read) != fs::perms::none);
  assert((status2.permissions() & fs::perms::owner_write) != fs::perms::none);
}
```
* type()[link type.md]
* permissions()[link permissions.md]
* fs::file_type[link /reference/filesystem/file_type.md]
* fs::perms[link /reference/filesystem/perms.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 4.8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
