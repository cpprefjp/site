# 推論補助
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class R, class... Ts>
  basic_vec(R&& r, Ts...) -> /*see below*/;           // (1)

  template<std::size_t Bytes, class Abi>
  basic_vec(basic_mask<Bytes, Abi>) -> /*see below*/; // (2)
}
```
* basic_mask[link ../basic_mask.md]

## 概要
`basic_vec`クラステンプレートの型推論補助。

- (1) : 連続範囲（contiguous range）かつ要素数が定数式となる範囲から推論する。推論される型は`vec<std::ranges::range_value_t<R>, static_cast<simd-size-type>(std::ranges::size(r))>`と等価である（`simd-size-type`は`std::simd`が用いる符号付きの要素数型）。
- (2) : [`basic_mask`](../basic_mask.md)から推論する。推論される型は`decltype(+k)`（マスクに単項プラスを適用して得られる`basic_vec`）と等価である。


## 例
```cpp example
#include <simd>
#include <array>
#include <print>

namespace simd = std::simd;

int main()
{
  // (1) 要素数が定数となる連続範囲から推論する
  std::array<int, 4> arr = {1, 2, 3, 4};
  simd::basic_vec v {arr};                       // vec<int, 4>

  // (2) マスクから推論する
  simd::vec<int, 4> a = [](int i) { return i; }; // {0, 1, 2, 3}
  auto m = (a < 2);                              // {true, true, false, false}
  simd::basic_vec w {m};                         // {1, 1, 0, 0}

  for (int i = 0; i < v.size(); ++i) {
    std::print("{} ", v[i]);
  }
  std::println("");

  for (int i = 0; i < w.size(); ++i) {
    std::print("{} ", w[i]);
  }
  std::println("");
}
```
* simd::basic_vec[color ff0000]
* simd::vec[link ../basic_vec.md]
* v.size()[link size.md]
* w.size()[link size.md]
* v[i][link op_at.md]
* w[i][link op_at.md]

### 出力
```
1 2 3 4 
1 1 0 0 
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
    - C++26で追加された
- [P3922R1 Missing deduction guide from `simd::mask` to `simd::vec`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3922r1.pdf)
    - `basic_mask`から`basic_vec`への推論補助が追加された
- [LWG Issue 4403. `simd::basic_vec` CTAD misses difference type casting](https://cplusplus.github.io/LWG/issue4403)
    - C++26で、推論される要素数が`static_cast<simd-size-type>(ranges::size(r))`となるよう修正された。`ranges::size`が返す符号なし整数を、`std::simd`が用いる符号付きの要素数型へ明示的にキャストするもの
