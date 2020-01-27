# wstring
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
std::wstring wstring() const;
```

## 概要
システムのワイド文�コードで、パス文�列を取得する。


## 戻り値
`*this`が保持するシステムのネイティブフォーマットを持つパスを、システムのワイド文�コードで返す。


## 備考
- WindowsではUTF-16となる


## 例
### Windowsでの例
```cpp
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "foo/bar";

  const std::wstring s = p.wstring();
  std::wcout << s << std::endl;
}
```
* p.wstring()[color ff0000]

#### 出力
```
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
