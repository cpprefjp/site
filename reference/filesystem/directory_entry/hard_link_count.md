# hard_link_count
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
std::uintmax_t hard_link_count() const;                             // (1)
std::uintmax_t hard_link_count(std::error_code& ec) const noexcept; // (2)
```
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

## 概要
ハードリンク数を取得する。


## 戻り値
値がキャッシュされている場合は、それを返す。キャッシュされていない場合は、

- (1) : [`std::filesystem::hard_link_count`](/reference/filesystem/hard_link_count.md)`(`[`path()`](path.md)`)`を返す
- (2) : [`std::filesystem::hard_link_count`](/reference/filesystem/hard_link_count.md)`(`[`path()`](path.md)`, ec)`を返す


## 例外
- (1) : [`std::filesystem::hard_link_count()`](/reference/filesystem/hard_link_count.md)関数が例外を送出する可能性がある
- (2) : 投げない


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir");
  fs::create_directory("dir/inner_dir");
  std::ofstream{"dir/a.txt"};

  for (const fs::directory_entry& x : fs::directory_iterator("dir")) {
    std::cout << x.path() << " : " << x.hard_link_count() << std::endl;
  }
}
```
* x.hard_link_count()[color ff0000]
* x.path()[link path.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::directory_iterator[link /reference/filesystem/directory_iterator.md]

### 出力例
```
"dir/inner_dir" : 2
"dir/a.txt" : 1
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
