# operator<=
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool operator<=(const path& lhs, const path& rhs) noexcept;
}
```

## 概要
`path`クラスにおいて、左辺が右辺以下かの判定を行う。


## 戻り値
```cpp
return !(rhs < lhs);
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

  assert(a <= b);
  assert(a <= a);
}
```
* a <= b[color ff0000]
* a <= a[color ff0000]

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
