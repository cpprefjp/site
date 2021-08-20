# operator!=
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool operator!=(const path& lhs, const path& rhs) noexcept;
}
```

## 概要
非等値比較を行う


## 戻り値
```cpp
return !(lhs == rhs);
```


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path a = "a/b/c";
  fs::path b = "a/b/d";

  assert(a != b);
  assert(!(a != a));

  // 正規化は考慮されない。
  // ファイルシステムとしてのパスの等価性ではなく、
  // パス文字列の同値性が比較されれる
  fs::path c = "a/../b/c";
  assert(a != c);
}
```
* !=[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7
