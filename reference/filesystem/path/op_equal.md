# operator==
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool operator==(const path& lhs, const path& rhs) noexcept;
}
```

## 概要
�値比較を行う


## 戻り値
```cpp
return !(lhs < rhs) && !(rhs < lhs);
```


## 備考
`lhs.`[`compare`](compare.md)`(rhs) == 0`と�価


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path a = "a/b/c";
  fs::path b = "a/b/d";

  assert(a == a);
  assert(!(a == b));

  // �規化は考慮されない。
  // ファイルシステムとしてのパスの�価性ではなく、
  // パス文�列の同値性が比較されれる
  fs::path c = "a/../b/c";
  assert(!(a == c));
}
```
* ==[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
