# insert_range
* map[meta header]
* std[meta namespace]
* map[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<value_type> R>
void insert_range(R&& rg);           // (1) C++23
template <container-compatible-range<value_type> R>
constexpr void insert_range(R&& rg); // (1) C++26
```

## 概要
Range`rg` の要素を挿入することにより、`map` コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](size.md) を増やす。

`map` コンテナは重複したキーを持つ要素を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じキーかどうかをチェックする。もし同じであれば要素は挿入されない。

重複した値を許す、類似したコンテナについては `multimap` を参照。

内部的に `map` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。


## 事前条件
`*this` の要素の範囲と Range`rg` の要素の範囲が重複していないこと


## テンプレートパラメータ制約
`value_type` は、コンテナに対して `EmplaceConstructible` であること


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
#include <map>
#include <utility>
#include <vector>

int main ()
{
    std::map<char, int> m = {{'A', 10}, {'B', 11}};

    std::vector<std::pair<char,int>> v = {{'B', 11}, {'C', 12}};
    m.insert_range(v);

    for (const auto& kv : m) {
        std::cout << kv.first << " " << kv.second << std::endl;
    }

    return 0;
}
```
* insert_range[color ff0000]

### 出力
```
A 10
B 11
C 12
```

## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`map::insert`](insert.md)                     | 要素を挿入する                          |
| [`map::insert_or_assign`](insert_or_assign.md) | 要素を挿入、あるいは代入する               |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
