# path2
* filesystem[meta header]
* std::filesystem[meta namespace]
* filesystem_error[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
const path& path2() const noexcept;
```
* path[link /reference/filesystem/path.md]

## 概要
エラーとなったふたつめのパスを取得す。


## 戻り値
コンストラクタで�定されたふたつめのパスを返す。パスが�定されなかった場合は、空のパスを返す。


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  try {
    throw fs::filesystem_error(
      "can't copy file. source file doesn't found",
      "a/from.txt",
      "b/to.txt",
      std::make_error_code(std::errc::no_such_file_or_directory)
    );
  }
  catch (fs::filesystem_error& err) {
    std::cout << err.path1() << std::endl;
    std::cout << err.path2() << std::endl;
  }
}
```
* path2()[color ff0000]
* std::make_error_code[link /reference/system_error/make_error_code.md]
* std::errc::no_such_file_or_directory[link /reference/system_error/errc.md]
* err.path1()[link path1.md]

### 出力
```
"a/from.txt"
"b/to.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
