# operator>>
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  template <class CharT, class Traits>
  std::basic_istream<CharT, Traits>&
    operator>>(std::basic_istream<CharT, Traits>& is, path& p);
}
```

## 概要
ストリームから入力する。

`path`オブジェクトにおいては、パス文字列が入力されること。

- 入力されるパス文字列のフォーマットは、システムフォーマットでも、システム非依存フォーマットどちらでも受け入れられる
- 入力されるパス文字列は、ダブルクォーテーション囲みされていても、されていなくても、どちらでも受け入れられる


## 効果
以下と同等：

```cpp
std::basic_string<CharT, Traits> tmp;
is >> quoted(tmp);
p = tmp;
```
* quoted[link /reference/iomanip/quoted.md]


## 戻り値
`is`


## 例
### POSIXベースシステムでの例
```cpp example
#include <cassert>
#include <sstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  std::istringstream ss {"\"a/b/c\""};

  fs::path p;
  ss >> p;

  assert(p.native() == "a/b/c");
}
```
* p.native()[link native.md]

#### 出力
```
```

### Windowsでの例
```cpp example
#include <cassert>
#include <sstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  std::istringstream ss {"\"a/b/c\""};

  fs::path p;
  ss >> p;

  assert(p.native() == "a\\b\\c");
}
```
* p.native()[link native.md]

#### 出力
```
"a\b\c"
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
