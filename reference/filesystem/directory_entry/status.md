# status
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
file_status status() const;                             // (1)
file_status status(std::error_code& ec) const noexcept; // (2)
```
* file_status[link /reference/filesystem/file_status.md]

## 概要
ファイル状態を取得する。


## 戻り値
値がキャッシュされている場合は、それを返す。キャッシュされていない場合は、

- (1) : [`std::filesystem::status`](/reference/filesystem/status.md)`(`[`path()`](path.md)`)`を返す
- (2) : [`std::filesystem::status`](/reference/filesystem/status.md)`(`[`path()`](path.md)`, ec)`を返す


## 例外
- (1) : [`std::filesystem::status()`](/reference/filesystem/status.md)関数が例外を送出する可能性がある
- (2) : 投げない


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>
#include <string>

namespace fs = std::filesystem;

std::string file_type_to_string(fs::file_type type) {
  switch (type) {
    case fs::file_type::none:       return "none";
    case fs::file_type::not_found:  return "not found";
    case fs::file_type::regular:    return "regular file";
    case fs::file_type::directory:  return "directory file";
    case fs::file_type::symlink:    return "symbolic link file";
    case fs::file_type::block:      return "block special file";
    case fs::file_type::character:  return "character special file";
    case fs::file_type::fifo:       return "FIFO or pipe file";
    case fs::file_type::socket:     return "socket file";
    case fs::file_type::unknown:    return "unknown type file";
    default:
      return "implementation-defined file type";
  }
}

int main()
{
  fs::create_directory("dir");
  fs::create_directory("dir/inner_dir");
  std::ofstream{"dir/a.txt"};

  for (const fs::directory_entry& x : fs::directory_iterator("dir")) {
    fs::file_status st = x.status();
    std::cout << x.path() << " : " << file_type_to_string(st.type()) << std::endl;
  }
}
```
* x.status()[color ff0000]
* x.path()[link path.md]
* fs::file_status[link /reference/filesystem/file_status.md]
* st.type()[link /reference/filesystem/file_status/type.md]
* fs::file_type[link /reference/filesystem/file_type.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::directory_iterator[link /reference/filesystem/directory_iterator.md]

### 出力例
```
"dir/inner_dir" : directory file
"dir/a.txt" : regular file
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
