# create_symlink
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void create_symlink(const path& to, const path& new_symlink); // (1)
  void create_symlink(const path& to, const path& new_symlink,
                      std::error_code& ec) noexcept;            // (2)
}
```
* path[link path.md]

## 概要
シンボリックリンクを作成する。

パス`to`のファイルに対するシンボリックリンクをパス`new_symlink`に作成する。


## 効果
- POSIX環境では、[`symlink()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/symlink.2.html)関数を使用して、パス`to`のファイル・ディレクトリに対するシンボリックリンクをパス`new_symlink`に作成する


## 戻り値
なし


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 備考
- ファイルシステムによっては、この関数でディレクトリに対するシンボリックリンクを作成できない場合がある。より汎用的なプ�グラムを記述するのであれば、ディレクトリに対しては[`create_directory_symlink()`](create_directory_symlink.md)関数を使用すること


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};

  // regular.txtに対するシンボリックリンクをregular.symlinkファイルとして作成する
  fs::create_symlink("regular.txt", "regular.symlink");

  assert(fs::exists("regular.symlink"));
  assert(fs::is_symlink("regular.symlink"));
}
```
* fs::create_symlink[color ff0000]
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
