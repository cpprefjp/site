# to_bitset
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr bitset<size()> to_bitset() const noexcept; // (1) C++26
```
* bitset[link /reference/bitset/bitset.md]
* size()[link size.md]

## 概要
マスクの各要素を[`std::bitset`](/reference/bitset/bitset.md)の対応するビットに変換して返す。


## 戻り値
すべての`i`（`0`以上`size()`未満）について、第`i`ビットが`operator[](i)`で初期化された[`std::bitset`](/reference/bitset/bitset.md)`<size()>`オブジェクト


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <bitset>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; };  // {0, 1, 2, 3}
  simd::mask<int, 4> m = (a < 2);                  // {true, true, false, false}

  std::bitset<4> bs = m.to_bitset();

  // 第0ビットが先頭要素に対応する
  std::println("{}", bs.to_string());
}
```
* simd::mask[link ../basic_mask.md]
* m.to_bitset()[color ff0000]
* bs.to_string()[link /reference/bitset/bitset/to_string.md]

### 出力
```
0011
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`to_ullong`](to_ullong.md)
- [`operator basic_vec`](op_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
