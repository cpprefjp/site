# insert_range
* set[meta header]
* std[meta namespace]
* set[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<value_type> R>
void insert_range(R&& rg);           // (1) C++23
template <container-compatible-range<value_type> R>
constexpr void insert_range(R&& rg); // (1) C++26
```

## 概要
Range`rg` の要素を挿入することにより、`set` コンテナを拡張する。

 `set` コンテナは重複した値を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じ値かどうかをチェックし、同じ要素がすでにあれば挿入されない。`multiset`の場合には、同じ値の要素でも挿入される。


## 戻り値
なし


## 計算量
`N =` [`ranges::distance`](../../iterator/ranges_distance.md)`(rg)` とすると、`N log (size() + N)` に比例


## 備考
- 関数が呼ばれた後も、当該コンテナ内の要素を指す参照やイテレータは無効にはならない。  
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。


## 例
```cpp example
#include <iostream>
#include <set>
#include <vector>

int main ()
{
    std::set<int> s = {1, 2, 3};

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

### 出力
```
1 2 3 4 
```

## 関連項目

| 名前                       | 説明                   |
|----------------------------|------------------------|
| [`insert`](insert.md)      | 要素を挿入する          |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
