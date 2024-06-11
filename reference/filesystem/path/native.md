# native
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
const string_type& native() const noexcept;
```

## 概要
システムの文字コードとしてパス文字列を取得する。


## 戻り値
`*this`が保持するシステムのネイティブフォーマットを持つパスを返す。


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
  const std::string& s = p.native();
  std::cout << s << std::endl;
}
```
* native()[color ff0000]

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

  // UTF-16エンコーディングで返る
  const std::wstring& s = p.native();
  std::wcout << s << std::endl;
}
```
* native()[color ff0000]

#### 出力
```
foo/bar
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]
