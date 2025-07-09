# default_sentinel_t
* iterator[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  struct default_sentinel_t {};

  inline constexpr default_sentinel_t default_sentinel{};
}
```

## 概要

`default_sentinel_t`は、任意の範囲の終端を示すことのできる番兵型である。

配列のようにイテレータ自身が範囲の終端を示すのではなく、別の方法で範囲の終端を計算可能である場合にイテレータ型の定義を簡易化するために使用できる。

イテレータ型でこの型との間の等値比較演算子（`==`、`!=`は導出される）を適切に定義し、その範囲を示すクラス（コンテナや`View`）の`end()`がこの型の値を返すようにすることで利用する。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  std::counted_iterator ci{std::ranges::begin(vec), 3};
  
  for (; ci != std::default_sentinel; ++ci) {
    std::cout << *ci << " ";
  }
}
```
* default_sentinel[color ff0000]
* counted_iterator[link /reference/iterator/counted_iterator.md]

### 出力
```
1 2 3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 7 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
