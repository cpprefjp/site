# insert_range
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<value_type> R>
void insert_range(R&& rg); // C++23
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
#include <unordered_set>
#include <vector>

int main ()
{
    std::unordered_set<int> s = {1, 2, 3};

    std::vector<int> v = {2, 3, 4};
    s.insert_range(v);

    for (int i : s) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    return 0;
}
```
* insert_range[color ff0000]

### 出力例
```
4 3 2 1 
```

注：[`unordered_set`](/reference/unordered_set/unordered_set.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`insert`](insert.md)                     | 要素の追加             |
