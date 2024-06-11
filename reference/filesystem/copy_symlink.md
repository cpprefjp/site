# copy_symlink
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void copy_symlink(const path& existing_symlink, const path& new_symlink); // (1)
  void copy_symlink(const path& existing_symlink, const path& new_symlink,
                    std::error_code& ec) noexcept;                          // (2)
}
```
* path[link path.md]

## 概要
シンボリックリンクをコピーする。

パス`existing_symlink`にあるファイル・ディレクトリへのシンボリックリンクが指すパスへのシンボリックリンクを、`new_symlink`に作成する。


## 効果
- パス`existing_sumlink`がシンボリックリンクに解決され、
    - それが非ディレクトリへのシンボリックリンクであれば、
        - (1) : [`create_symlink`](create_symlink.md)`(`[`read_symlink`](read_symlink.md)`(existing_symlink), new_symlink)`と等価の処理をする
        - (2) : [`create_symlink`](create_symlink.md)`(`[`read_symlink`](read_symlink.md)`(existing_symlink, ec), new_symlink, ec)`と等価の処理をする
    - ディレクトリへのシンボリックリンクであれば、
        - (1) : [`create_directory_symlink`](create_directory_symlink.md)`(`[`read_symlink`](read_symlink.md)`(existing_symlink), new_symlink)`と等価の処理をする
        - (2) : [`create_directory_symlink`](create_directory_symlink.md)`(`[`read_symlink`](read_symlink.md)`(existing_symlink, ec), new_symlink, ec)`と等価の処理をする
- シンボリックリンク以外のファイルの場合はエラー


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。パス`existing_symlink`がシンボリックリンクに解決されない場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
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
  fs::create_symlink("regular.txt", "regular.symlink");

  fs::copy_symlink("regular.symlink", "copied.symlink");

  assert(fs::exists("regular.symlink"));
  assert(fs::exists("copied.symlink"));

  assert(fs::read_symlink("regular.symlink") == "regular.txt");
  assert(fs::read_symlink("copied.symlink") == "regular.txt");
}
```
* fs::copy_symlink[color ff0000]
* fs::create_symlink[link create_symlink.md]
* fs::exists[link exists.md]
* fs::read_symlink[link read_symlink.md]

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
