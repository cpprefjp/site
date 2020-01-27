# is_other
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool is_other() const;                             // (1)
bool is_other(std::error_code& ec) const noexcept; // (2)
```

## 概要
パスが�在していない、もしくはシステム依�の種別のファイルを指しているかを確認する。


## 戻り値
- (1) : [`std::filesystem::is_other`](/reference/filesystem/is_other.md)`(this->`[`status()`](status.md)`)`を返す
- (2) : [`std::filesystem::is_other`](/reference/filesystem/is_other.md)`(this->`[`status()`](status.md)`, ec)`を返す


## 例外
- (1) : [`std::filesystem::is_other()`](/reference/filesystem/is_other.md)関数が例外を送出する可能性がある
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

  std::cout << std::boolalpha;
  for (const fs::directory_entry& x : fs::directory_iterator("dir")) {
    std::cout << x.path() << " : " << x.is_other() << std::endl;
  }
}
```
* x.is_other()[color ff0000]
* x.path()[link path.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::directory_iterator[link /reference/filesystem/directory_iterator.md]

### 出力例
```
"dir/inner_dir" : false
"dir/a.txt" : false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
