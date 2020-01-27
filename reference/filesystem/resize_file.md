# resize_file
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void resize_file(const path& p, std::uintmax_t new_size);                               // (1)
  void resize_file(const path& p, std::uintmax_t new_size, std::error_code& ec) noexcept; // (2)
}
```
* path[link path.md]
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

## 概要
ファイルサイズを変更する。


## 効果
- ファイル`p`の大きさを、`new_size`バイトに変更する。
    - POSIX環境では、[`truncate()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/truncate.2.html)関数を使用する


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、ファイルが�在しない場合はエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 備考
- POSIX環境では、ファイルサイズを縮小する場合は末尾のデータが切り詰められる。ファイルサイズを伸長する場合は延ばした領域がヌルバイト (`'\0'`) で埋められる
- 通常ファイル (とそのファイルへのシンボリックリンク) 以外に対してこの関数を実行した場合の動作は未規定


## 例
```cpp example
#include <cassert>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // 4バイトのファイルを作る
  {
    std::ofstream file{"regular.txt", std::ios::binary};
    std::uint32_t value = 42;
    file.write(reinterpret_cast<char*>(&value), sizeof(value));
  }

  // 8バイトに伸長
  fs::resize_file("regular.txt", 8);
  assert(fs::file_size("regular.txt") == 8);

  // 4バイトに縮小
  fs::resize_file("regular.txt", 4);
  assert(fs::file_size("regular.txt") == 4);
}
```
* fs::resize_file[color ff0000]
* fs::file_size[link file_size.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

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
- [LWG Issue 2816. `resize_file` has impossible postcondition](https://wg21.cmeerw.net/lwg/issue2816)
