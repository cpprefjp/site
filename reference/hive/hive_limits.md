# hive_limits
* hive[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  struct hive_limits {
    std::size_t min;
    std::size_t max;
    constexpr hive_limits(std::size_t minimum, std::size_t maximum) noexcept
      : min(minimum), max(maximum) {}
  };
}
```

## 概要
`hive_limits`は、[`hive`](hive.md)の要素ブロックが保持できる要素数の下限（`min`）と上限（`max`）を指定するためのクラスである。

[`std::hive`](hive.md)のコンストラクタや[`reshape()`](hive/reshape.md)メンバ関数に渡すことで要素ブロックの容量制限を指定でき、[`block_capacity_limits()`](hive/block_capacity_limits.md)や[`block_capacity_default_limits()`](hive/block_capacity_default_limits.md)、[`block_capacity_hard_limits()`](hive/block_capacity_hard_limits.md)の戻り値として得られる。

`min`は`max`以下でなければならず、両者は処理系が定めるハード制限（[`block_capacity_hard_limits()`](hive/block_capacity_hard_limits.md)）の範囲内でなければならない。範囲外の値や`min > max`となる値を指定した場合はエラー性動作（erroneous behavior）となり、その効果は処理系定義である。指定した値がハード制限の範囲内かどうかは[`is_within_hard_limits()`](hive/is_within_hard_limits.md)で確認できる。


## メンバ変数

| 名前  | 説明                             | 対応バージョン |
|-------|----------------------------------|----------------|
| `min` | 要素ブロックが保持できる要素数の下限 (`size_t`) | C++26 |
| `max` | 要素ブロックが保持できる要素数の上限 (`size_t`) | C++26 |


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `(constructor)` | `min`を`minimum`で、`max`を`maximum`で初期化するコンストラクタ | C++26 |


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  // 要素ブロックが保持できる要素数を、最小8・最大64に制限する
  std::hive_limits limits{8, 64};

  std::hive<int> h{limits};

  std::println("min={}, max={}", h.block_capacity_limits().min,
                                 h.block_capacity_limits().max);
}
```
* std::hive_limits[color ff0000]
* h.block_capacity_limits()[link hive/block_capacity_limits.md]

### 出力例
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
- [`hive`](hive.md)
- [`hive::block_capacity_limits`](hive/block_capacity_limits.md)
- [`hive::reshape`](hive/reshape.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive_limits`が追加された
