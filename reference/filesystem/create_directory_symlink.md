# create_directory_symlink
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void create_directory_symlink(const path& to, const path& new_symlink); // (1)
  void create_directory_symlink(const path& to, const path& new_symlink,
                                std::error_code& ec) noexcept;            // (2)
}
```
* path[link path.md]

## 概要
ディレクトリに対するシンボリックリンクを作成する。

パス`to`のディレクトリに対するシンボリックリンクをパス`new_symlink`に作成する。

ファイルシステムによっては、ディレクトリに対するシンボリックリンクを[`create_symlink()`](create_symlink.md)関数で作成できない場合がある。より汎用的なプ�グラムを記述する場合に、この関数を使用する。


## 効果
- POSIX環境では、[`symlink()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/symlink.2.html)関数を使用して、パス`to`のディレクトリに対するシンボリックリンクをパス`new_symlink`に作成する
    - パス`to`は、パス`new_symlink`からの相対パスであることに注意


## 戻り値
なし


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir");

  // dirに対するシンボリックリンクをdir_symlinkファイルとして作成する
  fs::create_directory_symlink("dir", "dir_symlink");

  assert(fs::exists("dir_symlink"));
  assert(fs::is_symlink("dir_symlink"));
}
```
* fs::create_directory_symlink[color ff0000]
* fs::create_directory[link create_directory.md]
* fs::exists[link exists.md]
* fs::is_symlink[link is_symlink.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
