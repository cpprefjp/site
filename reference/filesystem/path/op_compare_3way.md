# operator<=>
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
friend strong_ordering operator<=>(const path& lhs, const path& rhs) noexcept; // (1) C++20
```

## 概要
三方比較を行う


## 戻り値
```cpp
return lhs.compare(rhs) <=> 0;
```
* compare[link compare.md]


## 備考
- この演算子により、以下の演算子が使用可能になる：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path a = "a/b/c";
  fs::path b = "a/b/d";

  assert((a <=> a) == 0);
  assert((a <=> b) != 0);

  // 正規化は考慮されない。
  // ファイルシステムとしてのパスの等価性ではなく、
  // パス文字列の同値性が比較されれる
  fs::path c = "a/../b/c";
  assert((a <=> c) != 0);
}
```
* <=>[color ff0000]

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
