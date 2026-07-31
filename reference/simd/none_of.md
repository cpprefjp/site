# none_of
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<std::size_t Bytes, class Abi>
  constexpr bool none_of(const basic_mask<Bytes, Abi>& k) noexcept; // (1) C++26

  constexpr bool none_of(std::same_as<bool> auto x) noexcept;       // (2) C++26
}
```
* basic_mask[link basic_mask.md]
* std::same_as[link /reference/concepts/same_as.md]

## 概要
マスクの全要素が`false`であるかを判定する。

- (1) : [`basic_mask`](basic_mask.md)`k`の全要素が`false`であるかを判定する。
- (2) : スカラーの`bool`値`x`の否定を返す（SIMD-genericなコードを書けるようにするためのオーバーロード）。

## 戻り値
- (1) : [`any_of`](any_of.md)`(k)`の否定、すなわち`!any_of(k)`を返す。
- (2) : `!x`を返す。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return i; }); // {0, 1, 2, 3}

  std::println("{}", simd::none_of(v < 0)); // 0未満の要素は存在しない
  std::println("{}", simd::none_of(v < 2)); // 2未満の要素が存在する
}
```
* simd::none_of[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
true
false
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::all_of`](all_of.md)
- [`std::simd::any_of`](any_of.md)
- [`std::simd::reduce_count`](reduce_count.md)
- [`std::simd::basic_mask`](basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
