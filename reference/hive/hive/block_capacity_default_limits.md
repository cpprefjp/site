# block_capacity_default_limits
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr hive_limits block_capacity_default_limits() noexcept; // C++26
```
* hive_limits[link ../hive_limits.md]

## 概要
処理系のデフォルトの容量制限を取得する。

ユーザーが容量制限を指定せずに`hive`オブジェクトを構築した場合に使用される、要素ブロックの容量制限（[`hive_limits`](../hive_limits.md)）を取得する。この関数は静的メンバ関数である。

なお、デフォルト制限は、処理系が要素ブロックに対してサポートできる容量の絶対的な限界であるハード制限（[`block_capacity_hard_limits`](block_capacity_hard_limits.md)）とは必ずしも一致しない。デフォルト制限は、処理系・ユーザー双方の最適化の余地を残すために、ハード制限より内側の値に定められることがある。


## 戻り値
`min`メンバと`max`メンバに処理系のデフォルト制限を設定した[`hive_limits`](../hive_limits.md)オブジェクト。


## 計算量
定数時間。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive_limits limits = std::hive<int>::block_capacity_default_limits();
  std::println("min={}, max={}", limits.min, limits.max);
}
```
* block_capacity_default_limits[color ff0000]
* std::hive_limits[link ../hive_limits.md]

### 出力例
```
min=8, max=8192
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive_limits`](../hive_limits.md)
- [`hive::block_capacity_limits`](block_capacity_limits.md)
- [`hive::block_capacity_hard_limits`](block_capacity_hard_limits.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
