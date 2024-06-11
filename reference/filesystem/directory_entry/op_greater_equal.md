# operator>=
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
// operator<=>により、以下のオーバーロードが使用可能になる (C++20)
bool operator>=(const directory_entry& rhs) const noexcept; // (1) C++17
```

## 概要
`directory_entry`オブジェクトにおいて、左辺が右辺以上かの判定を行う。


## 戻り値
```cpp
return path() >= rhs.path();
```
* path()[link path.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::directory_entry x{"b.txt"};
  fs::directory_entry y{"a.txt"};

  if (x >= y) {
    std::cout << "greater equal" << std::endl;
  }
}
```

### 出力
```
greater equal
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
