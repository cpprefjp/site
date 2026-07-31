# assign_range
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <container-compatible-range<T> R>
void assign_range(R&& rg); // (1) C++26
```

## 概要
コンテナにRangeを代入する。


## 事前条件
`*this`の要素の範囲とRange`rg`の要素の範囲が重複していないこと。


## テンプレートパラメータ制約
型`T`が`*ranges::begin(rg)`から`hive`コンテナへの`EmplaceConstructible`であること。


## 効果
現在保持している要素を全て破棄し、Range`rg`の各要素を代入する。


## 戻り値
なし


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h = {1, 2, 3};
  const int a[] = {4, 5, 6, 7};

  // Rangeを代入する
  h.assign_range(a);

  std::println("size = {}", h.size());
}
```
* h.assign_range[color ff0000]
* h.size()[link size.md]

### 出力
```
size = 4
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`assign`](assign.md)
- [`insert_range`](insert_range.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
