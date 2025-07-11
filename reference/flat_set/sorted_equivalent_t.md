# sorted_equivalent_t
* flat_set[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  struct sorted_equivalent_t { explicit sorted_equivalent_t() = default; };
  inline constexpr sorted_equivalent_t sorted_equivalent{};
}
```

## 概要
`sorted_equivalent_t`は、[`flat_multiset`](flat_multiset.md)コンテナに挿入するシーケンスがソート済みであること（重複は許可される）を示すためのタグ型および値である。

このクラス自体は空であり、オーバーロード解決のためにのみ使用される。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs = {3};

  std::flat_multiset<int> fs2 = {5, 15};

  // 挿入するシーケンスがソート済みであることがわかっている場合、
  // sorted_equivalentを指定した方が高速になる
  fs.insert(std::sorted_equivalent, fs2.begin(), fs2.end());

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* std::sorted_equivalent[color ff0000]
* insert[link flat_multiset/insert.md]
* begin()[link flat_multiset/begin.md]
* end()[link flat_multiset/end.md]

### 出力
```
3
5
15
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::flat_multiset`](flat_multiset.md)
