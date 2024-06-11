# permissions
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void permissions(const path& p, perms prms, perm_options opts=perm_options::replace); // (1)
  void permissions(const path& p, perms prms, std::error_code& ec) noexcept;            // (2)
  void permissions(const path& p, perms prms, perm_options opts, std::error_code& ec);  // (3)
}
```
* path[link path.md]
* perms[link perms.md]
* perm_options[link perm_options.md]

## 概要
ファイルの権限を設定する。


## 効果
- POSIX環境では、[`fchmodat()`](http://ja.manpages.org/fchmodat/2)関数を使用して、パス`to`のファイルに対する権限を設定する
- (2) は、権限オプションとして[`perm_options::replace`](perm_options.md)が使用される


## 戻り値
なし


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};

  // regular.txtファイルの権限を、owner_all (0700) に変更する
  fs::permissions("regular.txt", fs::perms::owner_all);
}
```
* fs::permissions[color ff0000]
* fs::perms::owner_all[link perms.md]

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


## 関連項目
- [`status()`](status.md)
- [`symlink_status()`](symlink_status.md)
