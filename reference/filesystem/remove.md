# remove
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool remove(const path& p);                               // (1)
  bool remove(const path& p, std::error_code& ec) noexcept; // (2)
}
```
* path[link path.md]

## 概要
ファイル・ディレクトリを削除する。


## 効果
- POSIX環境では、[`remove()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/remove.3.html)関数を使用して、ファイル・ディレクトリを削除する。この環境では、ディレクトリを削除する場合、そのディレクトリは空でなければならない


## 戻り値
この関数の実行結果として`!`[`exists`](exists.md)`(p)`であれば`false`、そうでなければ`true`が返る。

(2)では、ファイルシステムでエラーが発生した場合でも`false`が返る。


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 備考
- POSIX環境では、ディレクトリが空でなければ、ディレクトリを削除できない。空でないディレクトリを削除したい場合は、[`remove_all()`](remove_all.md)関数を使用すること
- POSIX環境では、同名の`remove()`関数が使用される。`using namespace std::filesystem;` をして名前空間を省略した上でこの関数を呼び出すと、標準C++の本関数を呼び出せず、ファイルシステムからのエラー報告を意図した形式で受け取れない可能性がある (標準C++では例外でエラー報告し、POSIXでは[`errno`](/reference/cerrno/errno.md)でエラー報告する)


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};
  fs::create_directory("empty_dir");

  fs::remove("regular.txt");
  fs::remove("empty_dir");

  // �在しないファイルを削除。
  // エラーにはならず、falseが返る
  bool result = fs::remove("not_exist.file");
  assert(!result);

  assert(!fs::exists("regular.txt"));
  assert(!fs::exists("empty_dir"));
}
```
* fs::remove[color ff0000]
* fs::create_directory[link create_directory.md]
* fs::exists[link exists.md]

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
