# u32string
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
std::u32string u32string() const;
```

## 概要
UTF-32エンコードで、パス文�列を取得する。


## 戻り値
`*this`が保持するシステムのネイティブフォーマットを持つパスを、UTF-32エンコードで返す。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";
  const std::u32string s = p.u32string();
}
```
* p.u32string()[color ff0000]

#### 出力
```
```


### Windowsでの例
```cpp
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "foo/bar";
  const std::u32string s = p.u32string();
}
```
* p.u32string()[color ff0000]

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
