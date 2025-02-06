# sorted_unique_t
* flat_set[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  struct sorted_unique_t { explicit sorted_unique_t() = default; };
  inline constexpr sorted_unique_t sorted_unique{};
}
```

## 概要
`sorted_unique_t`は、[`flat_set`](flat_set.md)コンテナに挿入するシーケンスがソート済みかつ重複要素がないことを示すためのタグ型および値である。

このクラス自体は空であり、オーバーロード解決のためにのみ使用される。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> fs = {3};

  std::flat_set<int> fs2 = {5, 15};

  // 挿入するシーケンスがソート済みかつ重複要素がないことがわかっている場合、
  // sorted_uniqueを指定した方が高速になる
  fs.insert(std::sorted_unique, fs2.begin(), fs2.end());

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* std::sorted_unique[color ff0000]
* insert[link flat_set/insert.md]
* begin()[link flat_set/begin.md]
* end()[link flat_set/end.md]

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
- [`std::flat_set`](flat_set.md)

