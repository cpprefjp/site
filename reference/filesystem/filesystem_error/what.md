# what
* filesystem[meta header]
* std::filesystem[meta namespace]
* filesystem_error[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
const char* what() const noexcept override;
```

## 概要
エラー理由の文�列を取得する。


## 戻り値
コンストラクタで�定されたエラー理由の文�列を返す。


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
    std::cout << err.what() << std::endl;
  }
}
```
* what()[color ff0000]
* std::make_error_code[link /reference/system_error/make_error_code.md]
* std::errc::no_such_file_or_directory[link /reference/system_error/errc.md]

### 出力例
```
filesystem error: can't copy file. source file doesn't found: No such file or directory
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
