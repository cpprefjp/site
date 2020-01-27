# file_size
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  std::uintmax_t file_size(const path& p);                               // (1)
  std::uintmax_t file_size(const path& p, std::error_code& ec) noexcept; // (2)
}
```
* path[link path.md]
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

## 概要
ファイルサイズを取得する。


## 戻り値
- ファイルが�在しない、もしくはファイルシステムでエラーが発生した場合、 (1) では[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出し、 (2) では`ec`にエラー情報が�定されて`static_cast<`[`uintmax_t`](/reference/cstdint/uintmax_t.md)`>(-1)`が返る
- `p`が通常ファイル、もしくは通常ファイルを指すシンボリックリンクである場合、ファイルサイズが返る
    - POSIX環境では[`stat()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/stat.2.html)関数の`st_size`メンバ変数を使用する
- `p`がそれ以外のファイル種別である場合は、実装定義の動作をする


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたファイルが�在しない場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 備考
- libstdc++では、通常ファイル、シンボリックリンク以外のファイル種別はエラー
- ファイルサイズの取得方法として、ファイルの�み込み位置をseekによって末尾に移動するものがあるが、その方法は推奨されていない。本関数を使用すること
    - [FIO19-C. ファイルサイズの計算に `fseek()` および `ftell()` を使用しない](https://www.jpcert.or.jp/sc-rules/c-fio19-c.html)


## 例
```cpp example
#include <cassert>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  {
    std::ofstream file{"regular.txt", std::ios::binary};
    std::uint32_t value = 42;
    file.write(reinterpret_cast<char*>(&value), sizeof(value));
  }

  std::uintmax_t size = fs::file_size("regular.txt");
  assert(size == 4);
}
```
* fs::file_size[color ff0000]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
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
