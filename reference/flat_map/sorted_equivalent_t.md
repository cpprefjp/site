# sorted_equivalent_t
* flat_map[meta header]
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
`sorted_equivalent_t`は、[`flat_multimap`](flat_multimap.md)コンテナに挿入するシーケンスがソート済みであること（重複は許可される）を示すためのタグ型および値である。

このクラス自体は空であり、オーバーロード解決のためにのみ使用される。


## 例
```cpp example
#include <flat_map>
#include <iostream>

int main()
{
  std::flat_multimap<int, char> fm = {
    {3, 'a'}
  };

  std::flat_multimap<int, char> fm2 = {
    {5, 'd'},
    {15, 'e'}
  };

  // 挿入するシーケンスがソート済みであることがわかっている場合、
  // sorted_equivalentを指定した方が高速になる
  fm.insert(std::sorted_equivalent, fm2.begin(), fm2.end());

  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* std::sorted_equivalent[color ff0000]
* insert[link flat_multimap/insert.md]
* begin()[link flat_multimap/begin.md]
* end()[link flat_multimap/end.md]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::flat_multimap`](flat_multimap.md)

