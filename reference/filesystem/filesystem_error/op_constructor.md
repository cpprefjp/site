# コンストラクタ
* filesystem[meta header]
* std::filesystem[meta namespace]
* filesystem_error[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
filesystem_error(const string& what_arg,
                 error_code ec);         // (1)

filesystem_error(const string& what_arg,
                 const path& p1,
                 error_code ec);         // (2)

filesystem_error(const string& what_arg,
                 const path& p1,
                 const path& p2,
                 error_code ec);         // (3)
```
* string[link /reference/string/basic_string.md]
* error_code[link /reference/system_error/error_code.md]
* path[link /reference/filesystem/path.md]

## 概要
- (1) : エラー理由の文字列と、エラーコードを受け取るコンストラクタ
- (2) : エラー理由の文字列、エラーとなったパス、エラーコードを受け取るコンストラクタ
- (3) : エラー理由の文字列、エラーとなったパスを一組と、エラーコードを受け取るコンストラクタ


## 事後条件
- (1) :
    - [`what()`](what.md)メンバ関数の戻り値 : `what_arg.c_str()`
    - [`code()`](code.md)メンバ関数の戻り値 : `ec`
    - [`path1()`](path1.md)メンバ関数の戻り値 : 空のパス
    - [`path2()`](path2.md)メンバ関数の戻り値 : 空のパス
- (2) :
    - [`what()`](what.md)メンバ関数の戻り値 : `what_arg.c_str()`
    - [`code()`](code.md)メンバ関数の戻り値 : `ec`
    - [`path1()`](path1.md)メンバ関数の戻り値 : コピーされた`p1`への参照
    - [`path2()`](path2.md)メンバ関数の戻り値 : 空のパス
- (3) :
    - [`what()`](what.md)メンバ関数の戻り値 : `what_arg.c_str()`
    - [`code()`](code.md)メンバ関数の戻り値 : `ec`
    - [`path1()`](path1.md)メンバ関数の戻り値 : コピーされた`p1`への参照
    - [`path2()`](path2.md)メンバ関数の戻り値 : コピーされた`p2`への参照


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // (1)
  try {
    throw fs::filesystem_error(
      "can't copy file. source file doesn't found",
      std::make_error_code(std::errc::no_such_file_or_directory)
    );
  }
  catch (fs::filesystem_error& err) {
    std::cout << err.what() << std::endl;
  }

  // (2)
  try {
    throw fs::filesystem_error(
      "can't copy file. source file doesn't found",
      "a/b.txt",
      std::make_error_code(std::errc::no_such_file_or_directory)
    );
  }
  catch (fs::filesystem_error& err) {
    std::cout << err.what() << std::endl;
  }

  // (3)
  try {
    throw fs::filesystem_error(
      "can't copy file. source file doesn't found",
      "a/from.txt",
      "b/to.txt",
      std::make_error_code(std::errc::no_such_file_or_directory)
    );
  }
  catch (fs::filesystem_error& err) {
    std::cout << err.what() << std::endl;
  }
}
```
* std::make_error_code[link /reference/system_error/make_error_code.md]
* std::errc::no_such_file_or_directory[link /reference/system_error/errc.md]
* err.what()[link what.md]

### 出力例
```
filesystem error: can't copy file. source file doesn't found: No such file or directory
filesystem error: can't copy file. source file doesn't found: No such file or directory [a/b.txt]
filesystem error: can't copy file. source file doesn't found: No such file or directory [a/from.txt] [b/to.txt]
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 4.8.1
- [Visual C++](/implementation.md#visual_cpp):
