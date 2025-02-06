# insert_range
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
template<container-compatible-range<value_type> R>
void insert_range(R&& rg);                        // (1) C++23
```
* container-compatible-range[link /reference/exposition-only/container-compatible-range.md]

## 概要
Rangeを挿入し、コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](size.md) を増やす。

内部的に `flat_multiset` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。


## 戻り値
なし


## 計算量
- Nをこの操作の前の[`size()`](size.md)、Mを[`ranges::distance`](/reference/iterator/ranges_distance.md)`(rg)`として、N + MlogM


## 備考
- この操作はインプレース・マージを行うため、追加のメモリ確保を行う可能性がある


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs = {3};

  std::flat_multiset<int> fs2 = {5, 15};

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
| 名前                                             | 説明                             |
|--------------------------------------------------|----------------------------------|
| [`flat_multiset::insert`](insert.md)             | 要素を挿入する                   |
| [`flat_multiset::emplace`](emplace.md)           | 要素を直接構築する               |
| [`flat_multiset::emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する |
