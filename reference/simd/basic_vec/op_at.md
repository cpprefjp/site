# operator[]
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr value_type
  operator[](simd-size-type i) const;    // (1) C++26

template<simd-integral I>
constexpr resize_t<I::size(), basic_vec>
  operator[](const I& indices) const;    // (2) C++26
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* simd-integral[link /reference/simd/simd-integral.md]

## 概要
要素を取得する、または複数のインデックスによって要素の並べ替えを取得する。

- (1) : 指定した位置の単一要素の値を取得する。
- (2) : インデックスを保持したデータ並列型`indices`によって、各要素を並べ替えた`basic_vec`を取得する。


## 事前条件
- (1) : `i >= 0 && i < size()`であること。


## 効果
- (2) : 以下と等価である。
    ```cpp
    return permute(*this, indices);
    ```


## 戻り値
- (1) : 第`i`要素の値。
- (2) : `indices`の第`j`要素が指すインデックスの要素を第`j`要素とする`basic_vec`。要素数は`indices`の要素数（`I::size()`）となる。


## 例外
- (1) : 投げない


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return (i + 1) * 10; });  // {10, 20, 30, 40}

  // (1) 単一要素の取得
  std::println("{}", v[2]);

  // (2) インデックス列による並べ替え
  simd::vec<int, 4> indices([](int i) { return 3 - i; });   // {3, 2, 1, 0}
  simd::vec<int, 4> r = v[indices];                         // {40, 30, 20, 10}

  for (int i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* v[2][color ff0000]
* r.size()[link size.md]

### 出力
```
30
40 30 20 10 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](../basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`が追加された
- [P2876R3 Proposal to extend `std::simd` with more constructors and accessors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2876r3.html)
    - インデックス列による並べ替えを取得する添字演算子が追加された
