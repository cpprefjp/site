# insert_range
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<value_type> R>
void insert_range(R&& rg);           // (1) C++23
template <container-compatible-range<value_type> R>
constexpr void insert_range(R&& rg); // (1) C++26
```

## 概要
コンテナにRange`rg` の要素を挿入する。


## 効果
Range`rg` のすべての要素 `t` に対して、`insert(t)` を呼び出した場合と等価。


## 事前条件
`*this` の要素の範囲と Range`rg` の要素の範囲が重複していないこと


## テンプレートパラメータ制約
`value_type` は、コンテナに対して `EmplaceConstructible` であること


## 戻り値
なし


## 計算量
`N =` [`ranges::distance`](../../iterator/ranges_distance.md)`(rg)` とすると、平均的なケースでは `O(N)`、最悪のケースでは `O(N size() + 1)`。


## 例
```cpp example
#include <iostream>
#include <unordered_map>
#include <utility>
#include <vector>

int main ()
{
    std::unordered_map<char, int> m = {{'A', 10}, {'B', 11}};

    std::vector<std::pair<char,int>> v = {{'B', 11}, {'C', 12}};
    m.insert_range(v);

    for (const auto& kv : m) {
        std::cout << kv.first << " " << kv.second << std::endl;
    }

    return 0;
}
```
* insert_range[color ff0000]

### 出力例
```
C 12
B 11
A 10
```

注：[`unordered_map`](/reference/unordered_map/unordered_map.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`insert`](insert.md)                     | 要素の追加             |
| [`insert_or_assign`](insert_or_assign.md) | 要素の追加、あるいは代入 |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
