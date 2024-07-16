# operator>=
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  // operator<=>により、以下のオーバーロードが使用可能になる (C++20)
  bool operator>=(const path& lhs, const path& rhs) noexcept; // (1) C++17
}
```

## 概要
`path`クラスにおいて、左辺が右辺以上かの判定を行う。


## 戻り値
```cpp
return !(lhs < rhs);
```


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path a = "a/b/d";
  fs::path b = "a/b/c";

  assert(a >= b);
  assert(a >= a);
}
```
* a >= b[color ff0000]
* a >= a[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
