# operator[]
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr value_type operator[](simd-size-type i) const; // (1) C++26

template<simd-integral I>
constexpr resize_t<I::size(), basic_mask>
  operator[](const I& indices) const;                        // (2) C++26
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* simd-integral[link /reference/simd/simd-integral.md]

## 概要
- (1) : 指定した位置の単一要素の値を取得する
- (2) : 添字を保持したデータ並列型`indices`を渡し、それらの位置の要素を並べ替えた`basic_mask`を取得する


## 事前条件
- (1) : `i >= 0 && i < size()`であること


## 効果
- (2) : 以下と等価である。
    ```cpp
    return permute(*this, indices);
    ```


## 戻り値
- (1) : `i`番目の要素の値
- (2) : `indices`の第`j`要素が指すインデックスの要素を第`j`要素とする`basic_mask`。要素数は`indices`の要素数（`I::size()`）となる


## 例外
- (1) : 投げない


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::mask<int, 4> m = [](int i) { return i % 2 == 0; };  // {true, false, true, false}

  // (1) 位置を指定して要素を取得する
  for (int i = 0; i < m.size(); ++i) {
    std::print("{} ", m[i]);
  }
  std::println("");
}
```
* simd::mask[link ../basic_mask.md]
* m.size()[link size.md]
* m[i][color ff0000]

### 出力
```
true false true false 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_mask`](../basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`が追加された
- [P2876R3 Proposal to extend `std::simd` with more constructors and accessors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2876r3.html)
    - インデックス列による並べ替えを取得する添字演算子が追加された
