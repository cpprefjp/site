# operator<<
* filesystem[meta header]
* std::filesystem[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  template <class CharT, class Traits>
  std::basic_ostream<CharT, Traits>&
    operator<<(std::basic_ostream<CharT, Traits>& os, const path& p);
}
```

## 概要
ストリームに出力する。

`path`オブジェクトにおいては、システムのパスフォーマットかつ、ダブルクォーテーション囲みでパス文字列が出力される。


## 戻り値
以下と同等：

```cpp
return os << quoted(p.string<CharT, Traits>());
```
* quoted[link /reference/iomanip/quoted.md]
* p.string[link string.md]


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "a/b/c";
  std::cout << p << std::endl;
}
```

#### 出力
```
"a/b/c"
```

### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "a/b/c";
  std::cout << p << std::endl;
}
```

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
