# to_ullong
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr unsigned long long to_ullong() const; // (1) C++26
```

## 概要
マスクの各要素をビットとする整数値を`unsigned long long`型で返す。第`i`要素が第`i`ビットに対応する。


## 事前条件
`unsigned long long`のビット幅を`N`とする。以下のいずれかを満たすこと。

- `size() <= N`である
- すべての`i`（`N`以上`size()`未満）について、`operator[](i)`が`false`を返す


## 戻り値
`*this`のビットに対応する整数値


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; };  // {0, 1, 2, 3}
  simd::mask<int, 4> m = (a < 2);                  // {true, true, false, false}

  // 第0要素が最下位ビットに対応する（0b0011 == 3）
  unsigned long long value = m.to_ullong();
  std::println("{}", value);
}
```
* simd::mask[link ../basic_mask.md]
* m.to_ullong()[color ff0000]

### 出力
```
3
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`to_bitset`](to_bitset.md)
- [`operator basic_vec`](op_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
