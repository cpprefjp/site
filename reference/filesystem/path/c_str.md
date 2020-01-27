# c_str
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
const value_type* c_str() const noexcept;
```

## 概要
システムの文�コードとしてC言語の文�列表現を取得する。


## 戻り値
[`native()`](native.md)`.`[`c_str()`](/reference/string/basic_string/c_str.md)と�価


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  // 代入されたパスがそのまま返る
  const char* s = p.c_str();
  std::cout << s << std::endl;
}
```
* c_str()[color ff0000]

#### 出力
```
/usr/bin/clang
```


### Windowsでの例
```cpp
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "foo/bar";

  // ディレクトリ区切り文�が"/"から"\\"に変換され、
  // UTF-16エンコーディングで返る
  const wchar_t* s = p.c_str();
  std::wcout << s << std::endl;
}
```
* c_str()[color ff0000]

#### 出力
```
foo\bar
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
