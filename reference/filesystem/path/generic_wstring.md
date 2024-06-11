# generic_wstring
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
std::wstring generic_wstring() const;
```

## 概要
システムのワイド文字コードで、環境非依存パスフォーマットのパス文字列を取得する。


## 戻り値
`*this`が保持するシステムの環境非依存パスフォーマットを持つパスを、システムのワイド文字コードで返す。


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
  fs::path p = "foo\\bar";

  const std::wstring s = p.generic_wstring();
  std::wcout << s << std::endl;
}
```
* p.generic_wstring()[color ff0000]

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
