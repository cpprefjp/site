# insert_range
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
template<container-compatible-range<value_type> R>
void insert_range(R&& rg);                       // (1) C++23
template<container-compatible-range<value_type> R>
constexpr void insert_range(R&& rg);             // (1) C++26

template<container-compatible-range<value_type> R>
constexpr void insert_range(sorted_unique_t, R&& rg); // (2) C++26
```
* container-compatible-range[link /reference/exposition-only/container-compatible-range.md]
* sorted_unique_t[link /reference/flat_set/sorted_unique_t.md]

## 概要
Rangeを挿入し、コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](size.md) を増やす。

`flat_set` コンテナは重複したキーを持つ要素を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じキーかどうかをチェックする。もし同じであれば要素は挿入されない。

重複した値を許す、類似したコンテナについては [`flat_multiset`](/reference/flat_set/flat_multiset.md) を参照。

内部的に `flat_set` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。


## 効果
- (1) : メンバ変数として保持しているコンテナ`c`に、以下のように挿入する：
    ```cpp
    ranges::for_each(rg, [&](auto&& e) {
      c.insert(c.end(), std::forward<decltype(e)>(e));
    });
    ```
    * ranges::for_each[link /reference/algorithm/ranges_for_each.md]
    * end()[link /reference/vector/vector/end.md]
    * insert[link /reference/vector/vector/insert.md]
    * std::forward[link /reference/utility/forward.md]

    - 次に、新しく挿入された要素の範囲を`value_comp()`を基準にソートする
    - 次に、ソートされた結果の範囲と、既存の要素のソートされた範囲をひとつのソートされた範囲にマージする
    - 最後に、重複する要素を削除する

- (2) : `insert_range(rg)`と等価


## 戻り値
なし


## 計算量
- (1) : Nをこの操作の前の[`size()`](size.md)、Mを[`ranges::distance`](/reference/iterator/ranges_distance.md)`(rg)`として、N + MlogM
- (2) : 線形


## 備考
- この操作はインプレース・マージを行うため、追加のメモリ確保を行う可能性がある


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> fs = {3};

  std::flat_set<int> fs2 = {5, 15};

  fs.insert_range(fs2);

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* insert_range[color ff0000]

### 出力
```
3
5
15
```


## バージョン
### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                        | 説明                             |
|---------------------------------------------|----------------------------------|
| [`flat_set::insert`](insert.md)             | 要素を挿入する                   |
| [`flat_set::emplace`](emplace.md)           | 要素を直接構築する               |
| [`flat_set::emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
- [P3567R2 flat_meow Fixes](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3567r2.html)
    - C++26で(2)の`sorted_unique_t`をとるオーバーロードが追加された
