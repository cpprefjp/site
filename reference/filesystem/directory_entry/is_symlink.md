# is_symlink
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool is_symlink() const;                             // (1)
bool is_symlink(std::error_code& ec) const noexcept; // (2)
```

## 概要
シンボリックリンクを指しているか確認する。


## 戻り値
- (1) : [`std::filesystem::is_symlink`](/reference/filesystem/is_symlink.md)`(this->`[`status()`](status.md)`)`を返す
- (2) : [`std::filesystem::is_symlink`](/reference/filesystem/is_symlink.md)`(this->`[`status()`](status.md)`, ec)`を返す


## 例外
- (1) : [`std::filesystem::is_symlink()`](/reference/filesystem/is_symlink.md)関数が例外を送出する可能性がある
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
  fs::create_symlink("dir/a.txt", "dir/a.symlink");

  std::cout << std::boolalpha;
  for (const fs::directory_entry& x : fs::directory_iterator("dir")) {
    std::cout << x.path() << " : " << x.is_symlink() << std::endl;
  }
}
```
* x.is_symlink()[color ff0000]
* x.path()[link path.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::create_symlink[link /reference/filesystem/create_symlink.md]
* fs::directory_iterator[link /reference/filesystem/directory_iterator.md]

### 出力例
```
"dir/a.symlink" : true
"dir/inner_dir" : false
"dir/a.txt" : false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
