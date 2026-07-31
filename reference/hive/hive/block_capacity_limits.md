# block_capacity_limits
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr hive_limits block_capacity_limits() const noexcept; // C++26
```
* hive_limits[link ../hive_limits.md]

## 概要
要素ブロックの容量制限を取得する。

現在この`hive`オブジェクトに設定されている、要素ブロックが保持できる要素数の下限・上限（[`hive_limits`](../hive_limits.md)）を取得する。


## 戻り値
現在の容量制限を表す[`hive_limits`](../hive_limits.md)オブジェクト。


## 計算量
定数時間。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  // 要素ブロックが保持できる要素数を、最小8・最大64に制限する
  std::hive<int> h{std::hive_limits{8, 64}};

  std::hive_limits limits = h.block_capacity_limits();
  std::println("min={}, max={}", limits.min, limits.max);
}
```
* block_capacity_limits[color ff0000]
* std::hive_limits[link ../hive_limits.md]

### 出力
```
min=8, max=64
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
- [`hive::block_capacity_default_limits`](block_capacity_default_limits.md)
- [`hive::block_capacity_hard_limits`](block_capacity_hard_limits.md)
- [`hive::reshape`](reshape.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
