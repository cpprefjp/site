# generic_u8string
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
std::string generic_u8string() const;   // (1) C++17
std::u8string generic_u8string() const; // (1) C++20
```

## 概要
UTF-8エンコードで、環境非依�パスフォーマットのパス文�列を取得する。


## 戻り値
`*this`が保持するシステムの環境非依�パスフォーマットを持つパスを、UTF-8エンコードで返す。


## 備考
- C++20から、破壊的変更として戻り値の型が[`std::string`](/reference/string/basic_string.md)から[`std::u8string`](/reference/string/basic_string.md)に変更となっている。これは、UTF-8エンコードされた文�型として`char8_t`が追加され、`char`型と型レベルで区別できるようにしたためである


## 例
### POSIXベースシステムでの例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";
  auto s = p.generic_u8string();

  // システムのマルチバイト文�コードからUTF-8に変換されたパス文�列が返される
  assert(s == u8"/usr/bin/clang");
}
```
* p.generic_u8string()[color ff0000]

#### 出力
```
```


### Windowsでの例
```cpp
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "foo\\bar";
  auto s = p.generic_u8string();

  // システムのマルチバイト文�コードからUTF-8に変換されたパス文�列が返される
  assert(s == u8"foo/bar");
}
```
* p.generic_u8string()[color ff0000]

#### 出力
```
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [C++20 `char8_t`](/lang/cpp20/char8_t.md)
