# rename
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void rename(const path& old_p, const path& new_p); // (1)
  void rename(const path& old_p, const path& new_p,
              std::error_code& ec) noexcept;         // (2)
}
```
* path[link path.md]

## 概要
ファイル・ディレクトリを名称変更・移動する。

本関数は、直接的にはファイル・ディレクトリの名称変更をする機能を持つが、名称変更は移動と同義であるため、ファイル・ディレクトリの移動としても使用できる。


## 効果
- パス`old_p`のファイル・ディレクトリを、パス`new_p`に名称変更する
    - POSIX環境では、[`rename()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/rename.2.html)関数を使用する
- パス`old_p`とパス`new_p`が同じファイルに解決される場合、本関数はなにもしない
- そうでない場合、名称変更操作には、以下のような効果も含む：
    - `new_p`がすでに�在する非ディレクトリのファイルに解決される場合、すでに�在している`new_p`のファイルは削除される
    - `new_p`がすでに�在しているディレクトリである場合、POSIX環境ではそのディレクトリが空であれば削除される、それ以外の環境ではエラーとなる可能性がある。
- パス`old_p`がシンボリックリンクである場合、シンボリックリンクが指す先のファイルではなく、シンボリックリンク自身が名称変更される


## 戻り値
なし


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 備考
- POSIX環境では、同名の`rename()`関数が使用される。`using namespace std::filesystem;` をして名前空間を省略した上でこの関数を呼び出すと、標準C++の本関数を呼び出せず、ファイルシステムからのエラー報告を意図した形式で受け取れない可能性がある (標準C++では例外でエラー報告し、POSIXでは[`errno`](/reference/cerrno/errno.md)でエラー報告する)


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  // ファイルを名称変更
  {
    std::ofstream{"a.txt"};

    // "a.txt"を、"b.txt"に名称変更
    fs::rename("a.txt", "b.txt");

    assert(!fs::exists("a.txt"));
    assert(fs::exists("b.txt"));
  }

  // ディレクトリを名称変更
  {
    // ファイルが含まれるディレクトリを作成
    fs::create_directory("a_dir");
    std::ofstream{"a_dir/regular.txt"};

    // "a_dir"ディレクトリを"b_dir"ディレクトリに名称変更
    fs::rename("a_dir", "b_dir");

    assert(!fs::exists("a_dir"));
    assert(fs::exists("b_dir"));
    assert(fs::exists("b_dir/regular.txt"));
  }

  // シンボリックリンクを名称変更
  {
    std::ofstream{"base.txt"};
    fs::create_symlink("base.txt", "base.symlink");

    fs::rename("base.symlink", "base_symlink.txt");

    assert(!fs::exists("base.symlink"));
    assert(fs::exists("base_symlink.txt"));
  }
}
```
* fs::rename[color ff0000]
* fs::exists[link exists.md]
* fs::create_directory[link create_directory.md]
* fs::create_symlink[link create_symlink.md]

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
