# string
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
template <class EcharT,
          class traits = std::char_traits<EcharT>,
          class Allocator = std::allocator<EcharT>>
std::basic_string<EcharT, traits, Allocator>
  string(const Allocator& a = Allocator()) const; // (1)

std::string string() const;                       // (2)
```

## 概要
- (1) : 指定された文�型に対応する文�コードで、パス文�列を取得する
- (2) : システムのマルチバイト文�コードで、パス文�列を取得する


## 戻り値
`*this`が保持するシステムのネイティブフォーマットを持つパスを、指定された文�型の文�コードで返す。

(1) の場合、戻り値の文�列をメモリア�ケートするために、パラメータ`a`のア�ケータを使用する。


## 備考
- (1) :
    - `ECharT`が`char`の場合、システムのマルチバイト文�コードとなる (POSIXベースシステムではUTF-8、Windowsの日本語環境ではCP932)
    - `ECharT`が`wchar_t`の場合、システムのワイド文�コードとなる (WindowsではUTF-16)
    - `ECharT`が`char8_t`の場合、UTF-8エンコーディングとなる
    - `ECharT`が`char16_t`の場合、UTF-16エンコーディングとなる
    - `ECharT`が`char32_t`の場合、UTF-32エンコーディングとなる
- (2) :
    - POSIXベースシステムではUTF-8、Windowsの日本語環境ではCP932文�コードとなる


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  // (1)
  {
    const std::string s = p.string<char>();
    const std::wstring ws = p.string<wchar_t>();
    const std::u16string utf16s = p.string<char16_t>();
    const std::u32string utf32s = p.string<char32_t>();

    std::cout << s << std::endl;
  }

  // (2)
  {
    const std::string s = p.string();
    std::cout << s << std::endl;
  }
}
```
* p.string[color ff0000]

#### 出力
```
/usr/bin/clang
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

  // (1)
  {
    const std::string s = p.string<char>();
    const std::wstring ws = p.string<wchar_t>();
    const std::u16string utf16s = p.string<char16_t>();
    const std::u32string utf32s = p.string<char32_t>();

    std::cout << s << std::endl;
  }

  // (2)
  {
    const std::string s = p.string();
    std::cout << s << std::endl;
  }
}
```
* p.string[color ff0000]

#### 出力
```
foo\bar
foo\bar
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
