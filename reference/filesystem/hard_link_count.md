# hard_link_count
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  std::uintmax_t hard_link_count(const path& p);                               // (1)
  std::uintmax_t hard_link_count(const path& p, std::error_code& ec) noexcept; // (2)
}
```
* path[link path.md]
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

## 概要
ハードリンク数を取得する。


## 戻り値
- パス`p`のハードリンク数を返す
- ファイルシステムでエラーが発生した場合、 (1) では[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出し、 (2) では`ec`にエラー情報が�定されて`static_cast<`[`uintmax_t`](/reference/cstdint/uintmax_t.md)`>(-1)`が返る


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたファイルが�在しない場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};

  assert(fs::hard_link_count("regular.txt") == 1);

  fs::create_hard_link("regular.txt", "regular-2.txt");

  assert(fs::hard_link_count("regular.txt") == 2);
  assert(fs::hard_link_count("regular-2.txt") == 2);
}
```
* fs::hard_link_count[color ff0000]
* fs::create_hard_link[link create_hard_link.md]

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
