# clamp
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi>
  constexpr basic_vec<T, Abi>
    clamp(const basic_vec<T, Abi>& v,
          const basic_vec<T, Abi>& lo,
          const basic_vec<T, Abi>& hi);  // C++26
}
```

## 概要
`clamp`は、[`basic_vec`](basic_vec.md)の各要素を、要素ごとに指定した範囲`[lo, hi]`に収める関数である。各要素が`lo`より小さければ`lo`に、`hi`より大きければ`hi`に切り詰められる。

## テンプレートパラメータ制約
- `T`が[`std::totally_ordered`](/reference/concepts/totally_ordered.md)のモデルであること

## 事前条件
- `lo`のどの要素も、`hi`の対応する要素より大きくないこと

## 戻り値
`i`番目の要素が`clamp(v[i], lo[i], hi[i])`となる`basic_vec`。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return i * 2; });  // {0, 2, 4, 6}
  simd::vec<int, 4> lo = 1;                          // {1, 1, 1, 1}
  simd::vec<int, 4> hi = 5;                          // {5, 5, 5, 5}

  // 各要素を範囲[1, 5]に収める
  auto r = simd::clamp(v, lo, hi);  // {1, 2, 4, 5}

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::clamp[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
1 2 4 5 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::simd::min`](min.md)
- [`std::simd::max`](max.md)
- [`std::simd::minmax`](minmax.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
