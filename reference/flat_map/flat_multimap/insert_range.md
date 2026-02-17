# insert_range
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
template<container-compatible-range<value_type> R>
void insert_range(R&& rg);           // (1) C++23
template<container-compatible-range<value_type> R>
constexpr void insert_range(R&& rg); // (1) C++26
```
* container-compatible-range[link /reference/exposition-only/container-compatible-range.md]

## 概要
Rangeを挿入し、コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](size.md) を増やす。

内部的に `flat_multimap` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。


## 効果
- メンバ変数として保持しているコンテナ`c`に、以下のように挿入する：
    ```cpp
    for (const auto& e : rg) {
      c.keys.insert(c.keys.end(), e.first);
      c.values.insert(c.values.end(), e.second);
    }
    ```
    * c.keys[link containers.md]
    * c.values[link containers.md]
    * end()[link /reference/vector/vector/end.md]
    * insert[link /reference/vector/vector/insert.md]
    * first[link /reference/utility/pair/first.md]
    * second[link /reference/utility/pair/second.md]

    - 次に、新しく挿入された要素の範囲を`value_comp()`を基準にソートする
    - 次に、ソートされた結果の範囲と、既存の要素のソートされた範囲をひとつのソートされた範囲にマージする


## 戻り値
なし


## 計算量
- Nをこの操作の前の[`size()`](size.md)、Mを[`ranges::distance`](/reference/iterator/ranges_distance.md)`(rg)`として、N + MlogM


## 備考
- この操作はインプレース・マージを行うため、追加のメモリ確保を行う可能性がある


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_multimap<int, char> fm = {
    {3, 'a'}
  };

  std::flat_multimap<int, char> fm2 = {
    {5, 'd'},
    {15, 'e'},
    {3, 'h'}
  };

  fm.insert_range(fm2);

  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* insert_range[color ff0000]

### 出力
```
3 : a
3 : h
5 : d
15 : e
```

## バージョン
### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                                             | 説明                             |
|--------------------------------------------------|----------------------------------|
| [`flat_multimap::insert`](insert.md)             | 要素を挿入する                   |
| [`flat_multimap::emplace`](emplace.md)           | 要素を直接構築する               |
| [`flat_multimap::emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
