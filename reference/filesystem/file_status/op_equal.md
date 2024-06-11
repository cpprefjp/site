# operator==
* filesystem[meta header]
* std::filesystem[meta namespace]
* file_status[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
friend bool operator==(const file_status& x, const file_status& y) noexcept; // (1) C++20
```

## 概要
等値比較を行う


## 戻り値
```cpp
return x.type() == y.type() && x.permissions() == y.permissions();
```
* type()[link type.md]
* permissions()[link permissions.md]


## 備考
- この演算子により、`operator!=`が使用可能になる (C++20)


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::file_status a;
  a.type(fs::file_type::regular);

  fs::file_status b;
  b.type(fs::file_type::regular);

  assert(a == b);
}
```
* ==[color ff0000]
* type[link type.md]
* fs::file_type[link /reference/filesystem/file_type.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
