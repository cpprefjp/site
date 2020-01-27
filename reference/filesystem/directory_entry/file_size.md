# file_size
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
std::uintmax_t file_size() const;                             // (1)
std::uintmax_t file_size(std::error_code& ec) const noexcept; // (2)
```
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

## 概要
ファイルサイズを取得する。


## 戻り値
値が�ャッシュされている場合は、それを返す。�ャッシュされていない場合は、

- (1) : [`std::filesystem::file_size`](/reference/filesystem/file_size.md)`(`[`path()`](path.md)`)`を返す
- (2) : [`std::filesystem::file_size`](/reference/filesystem/file_size.md)`(`[`path()`](path.md)`, ec)`を返す


## 例外
- (1) : [`std::filesystem::file_size()`](/reference/filesystem/file_size.md)関数が例外を送出する可能性がある
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
  {
    std::ofstream file{"dir/a.txt", std::ios::binary};
    std::uint32_t value = 42;
    file.write(reinterpret_cast<char*>(&value), sizeof(value));
  }

  for (const fs::directory_entry& x : fs::directory_iterator("dir")) {
    if (x.is_regular_file()) {
      std::cout << x.path() << " : " << x.file_size() << std::endl;
    }
  }
}
```
* x.file_size()[color ff0000]
* x.path()[link path.md]
* x.is_regular_file()[link is_regular_file.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::directory_iterator[link /reference/filesystem/directory_iterator.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力
```
"dir/a.txt" : 4
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
