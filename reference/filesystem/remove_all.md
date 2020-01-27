# remove_all
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  std::uintmax_t remove_all(const path& p);                      // (1)
  std::uintmax_t remove_all(const path& p, std::error_code& ec); // (2)
}
```
* path[link path.md]
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

## 概要
再帰的にファイル・ディレクトリを削除する。

[`remove()`](remove.md)関数では、環境によって空でないディレクトリを削除できない場合があるため、空でないディレクトリを削除するために、本関数を使用する。


## 効果
- パス`p`のコンテンツを、再帰的に削除する
- POSIX環境では、それぞれのコンテンツの削除に、[`remove()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/remove.3.html)関数を使用する


## 戻り値
削除されたファイルの数が返る


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : ディレクトリを走査する際にメモリ確保に失敗した場合、例外を送出する可能性がある


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
  fs::create_directory("non_empty_dir");
  std::ofstream{"non_empty_dir/file_in_dir.txt"};

  // 単一ファイルを削除
  fs::remove_all("regular.txt");

  // 空、および非空のディレクトリを削除
  fs::remove_all("empty_dir");
  fs::remove_all("non_empty_dir");

  // �在しないファイルを削除。
  // エラーにはならず、0が返る
  std::uintmax_t result = fs::remove_all("not_exist.file");
  assert(result == 0);

  assert(!fs::exists("regular.txt"));
  assert(!fs::exists("empty_dir"));
  assert(!fs::exists("non_empty_dir"));
}
```
* fs::remove_all[color ff0000]
* fs::create_directory[link create_directory.md]
* fs::exists[link exists.md]
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

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


## 参照
- [LWG Issue 3014. More `noexcept` issues with filesystem operations](https://wg21.cmeerw.net/lwg/issue3014)
