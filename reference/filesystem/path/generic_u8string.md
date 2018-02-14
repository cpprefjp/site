# generic_u8string
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
std::string generic_u8string() const;
```

## 概要
UTF-8エンコードで、環境非依存パスフォーマットのパス文字列を取得する。


## 戻り値
`*this`が保持するシステムの環境非依存パスフォーマットを持つパスを、UTF-8エンコードで返す。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  const std::string s = p.generic_u8string();
  std::cout << s << std::endl;
}
```
* p.generic_u8string()[color ff0000]

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
  fs::path p = "foo\\bar";

  const std::string s = p.generic_u8string();
  std::cout << s << std::endl;
}
```
* p.generic_u8string()[color ff0000]

#### 出力
```
foo/bar
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
