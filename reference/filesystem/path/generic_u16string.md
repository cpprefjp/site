# generic_u16string
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
std::u16string generic_u16string() const;
```

## 概要
UTF-16エンコードで、環境非依�パスフォーマットのパス文�列を取得する。


## 戻り値
`*this`が保持するシステムの環境非依�パスフォーマットを持つパスを、UTF-16エンコードで返す。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";
  const std::u16string s = p.generic_u16string();
}
```
* p.generic_u16string()[color ff0000]

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
  const std::u16string s = p.generic_u16string();
  assert(s == u"foo/bar");
}
```
* p.generic_u16string()[color ff0000]

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
