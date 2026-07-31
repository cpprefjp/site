# block_capacity_hard_limits
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr hive_limits block_capacity_hard_limits() noexcept; // C++26
```
* hive_limits[link ../hive_limits.md]

## 概要
処理系のハード制限を取得する。

「ハード制限（hard limits）」とは、その処理系の実装が要素ブロックに対して実際にサポートできる、保持要素数の下限・上限の絶対的な限界値である。要素ブロックが保持できる要素数の最小値・最大値そのものであり、この範囲を超える容量制限を要素ブロックに設定することはできない。この関数は、そのハード制限を`min`・`max`メンバに設定した[`hive_limits`](../hive_limits.md)を返す静的メンバ関数である。

ユーザーが`hive`のコンストラクタや[`reshape`](reshape.md)に渡す容量制限（[`hive_limits`](../hive_limits.md)）は、必ずこのハード制限の範囲内でなければならない。範囲外の値を指定した場合の動作は「エラー性動作（erroneous behavior）」となる。指定した容量制限がハード制限の範囲内かどうかは、[`is_within_hard_limits()`](is_within_hard_limits.md)で事前に確認できる。

ハード制限は、ユーザーが制限を指定しなかったときに使われるデフォルト制限（[`block_capacity_default_limits`](block_capacity_default_limits.md)）とは必ずしも一致しない。デフォルト制限は、処理系・ユーザー双方の最適化の余地を残すために、ハード制限より内側の値に定められることがある。


## 戻り値
`min`メンバと`max`メンバに処理系のハード制限を設定した[`hive_limits`](../hive_limits.md)オブジェクト。


## 計算量
定数時間。


## 備考
ハード制限の`max`は、[`std::allocator_traits<Allocator>::max_size()`](/reference/memory/allocator_traits/max_size.md)以下である。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive_limits limits = std::hive<int>::block_capacity_hard_limits();
  std::println("min={}, max={}", limits.min, limits.max);
}
```
* block_capacity_hard_limits[color ff0000]
* std::hive_limits[link ../hive_limits.md]

### 出力例
```
min=3, max=255
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
- [`hive::block_capacity_default_limits`](block_capacity_default_limits.md)
- [`hive::is_within_hard_limits`](is_within_hard_limits.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
