# sorted_unique_t
* flat_map[meta header]
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
`sorted_unique_t`は、[`flat_map`](flat_map.md)コンテナに挿入するシーケンスがソート済みかつ重複要素がないことを示すためのタグ型および値である。

このクラス自体は空であり、オーバーロード解決のためにのみ使用される。


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm = {
    {3, 'a'}
  };

  std::flat_map<int, char> fm2 = {
    {5, 'd'},
    {15, 'e'}
  };

  // 挿入するシーケンスがソート済みかつ重複要素がないことがわかっている場合、
  // sorted_uniqueを指定した方が高速になる
  fm.insert(std::sorted_unique, fm2.begin(), fm2.end());

  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* std::sorted_unique[color ff0000]
* insert[link flat_map/insert.md]
* begin()[link flat_map/begin.md]
* end()[link flat_map/end.md]

### 出力
```
3 : a
5 : d
15 : e
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::flat_map`](flat_map.md)
