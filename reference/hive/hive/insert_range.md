# insert_range
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <container-compatible-range<T> R>
void insert_range(R&& rg); // C++26
```

## 概要
Rangeの各要素を挿入する。

挿入位置はコンテナが決定するため、挿入する位置を指定することはできない（順序は未規定である）。


## テンプレートパラメータ制約
- 型`T`が、`*ranges::begin(rg)`から`hive`コンテナへの`EmplaceInsertable`であること
- `rg`と`*this`が重なっていないこと


## 効果
Range`rg`の各要素のコピーを挿入する。範囲`rg`の各イテレータは、ちょうど1回だけ間接参照される。


## 戻り値
なし


## 計算量
挿入する要素数に比例して線形時間。挿入する各要素に対して、型`T`のオブジェクトがちょうど1個構築される。


## 備考
要素が挿入された場合、終端イテレータ（past-the-end iterator）は無効になる。削除されなかった既存要素へのポインタ・参照・イテレータは無効にならない。


## 例
```cpp example
#include <hive>
#include <print>
#include <vector>

int main()
{
  std::hive<int> h;
  h.insert(1);

  // Rangeの要素を挿入する
  const std::vector<int> v = {2, 3, 4};
  h.insert_range(v);

  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* insert_range[color ff0000]
* h.insert[link insert.md]

### 出力例
```
1 2 3 4 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目

| 名前                    | 説明                     |
|-------------------------|--------------------------|
| [`insert`](insert.md)   | 要素を挿入する           |
| [`emplace`](emplace.md) | 要素を直接構築で挿入する |


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
