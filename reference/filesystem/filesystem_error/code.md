# code
* filesystem[meta header]
* std::filesystem[meta namespace]
* filesystem_error[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
const error_code& code() const noexcept;
```
* error_code[link /reference/system_error/error_code.md]

## 概要
エラーコードを取得する。


## 戻り値
コンストラクタで�定されたエラーコードを返す。


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
      std::make_error_code(std::errc::no_such_file_or_directory)
    );
  }
  catch (fs::filesystem_error& err) {
    std::cout << err.code() << std::endl;
  }
}
```
* code()[color ff0000]
* std::make_error_code[link /reference/system_error/make_error_code.md]
* std::errc::no_such_file_or_directory[link /reference/system_error/errc.md]

### 出力例
```
generic:2
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
