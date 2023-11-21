# create_hard_link
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void create_hard_link(const path& to, const path& new_hard_link); // (1)
  void create_hard_link(const path& to, const path& new_hard_link,
                        std::error_code& ec) noexcept;              // (2)
}
```
* path[link path.md]

## 概要
ハードリンクを作成する。

パス`to`のファイルと同じinodeを参照するハードリンクをパス`new_hard_link`に作成する。


## 効果
- POSIX環境では、[`link()`](https://web.archive.org/web/20230206201555/http://linuxjm.osdn.jp/html/LDP_man-pages/man2/link.2.html)関数を使用して、パス`to`のファイルと同じinodeを参照するハードリンクをパス`new_hard_link`に作成する


## 戻り値
なし


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 備考
- ファイルシステムによっては、この関数で通常ファイル以外に対するハードリンクを作成できない場合がある


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};

  // regular.txtと同じinodeを参照するハードリンクregular2.txtを作成する
  fs::create_hard_link("regular.txt", "regular2.txt");

  assert(fs::exists("regular2.txt"));
  assert(fs::equivalent("regular.txt", "regular2.txt"));
  assert(fs::hard_link_count("regular.txt") == 2);
  assert(fs::hard_link_count("regular2.txt") == 2);
}
```
* fs::create_hard_link[color ff0000]
* fs::exists[link exists.md]
* fs::equivalent[link equivalent.md]
* fs::hard_link_count[link hard_link_count.md]

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
