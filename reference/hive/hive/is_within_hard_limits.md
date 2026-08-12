# is_within_hard_limits
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr bool is_within_hard_limits(hive_limits lim) noexcept; // C++26
```
* hive_limits[link ../hive_limits.md]

## 概要
指定した容量制限がハード制限の範囲内か判定する。

指定した容量制限`lim`が、処理系のハード制限（[`block_capacity_hard_limits()`](block_capacity_hard_limits.md)）の範囲内にあり、かつ`lim.min <= lim.max`を満たすかどうかを判定する。この関数は静的メンバ関数である。

`hive`のコンストラクタや[`reshape`](reshape.md)に渡す容量制限が妥当かどうかを、事前に確認するために使用できる。


## 戻り値
`hl`を[`block_capacity_hard_limits()`](block_capacity_hard_limits.md)として、以下を返す。

```cpp
hl.min <= lim.min && lim.min <= lim.max && lim.max <= hl.max
```
* hl.min[link ../hive_limits.md]
* hl.max[link ../hive_limits.md]
* lim.min[link ../hive_limits.md]
* lim.max[link ../hive_limits.md]


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  using hive = std::hive<int>;

  // min > max となる制限は、ハード制限によらず常に範囲外と判定される
  std::println("{}", hive::is_within_hard_limits({64, 8}));

  // 処理系のハード制限そのものは、常に範囲内と判定される
  std::hive_limits hard = hive::block_capacity_hard_limits();
  std::println("{}", hive::is_within_hard_limits({hard.min, hard.max}));
}
```
* is_within_hard_limits[color ff0000]
* std::hive_limits[link ../hive_limits.md]
* hive::block_capacity_hard_limits[link block_capacity_hard_limits.md]

### 出力
```
false
true
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
- [`hive::block_capacity_hard_limits`](block_capacity_hard_limits.md)
- [`hive::reshape`](reshape.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
- [LWG Issue 4554. Remove undefined behaviour from `hive` for invalid limits](https://cplusplus.github.io/LWG/issue4554)
    - C++26で、不正な容量制限に対する動作が未定義動作からエラー性動作（効果は処理系定義）に変更され、事前検証用の静的メンバ関数`is_within_hard_limits`が追加された
