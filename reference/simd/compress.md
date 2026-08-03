# compress
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-vec-type V>
  constexpr V
    compress(const V& v,
             const typename V::mask_type& selector); // (1) C++26
  template<simd-mask-type V>
  constexpr V
    compress(const V& v,
             const type_identity_t<V>& selector);    // (2) C++26

  template<simd-vec-type V>
  constexpr V
    compress(const V& v,
             const typename V::mask_type& selector,
             const typename V::value_type& fill_value); // (3) C++26
  template<simd-mask-type V>
  constexpr V
    compress(const V& v,
             const type_identity_t<V>& selector,
             const typename V::value_type& fill_value); // (4) C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]
* simd-mask-type[link /reference/simd/simd-mask-type.md]

## 概要
`compress`は、[`basic_vec`](basic_vec.md)や[`basic_mask`](basic_mask.md)の要素のうち、マスク`selector`が`true`である要素だけを、順序を維持したまま先頭に詰めたデータ並列オブジェクトを返す関数である。

`true`である要素の個数を`n`とすると、結果の先頭`n`要素に、元のオブジェクトで`selector`が`true`だった要素が昇順に並ぶ。残りの要素の値は以下のように決まる。

- (1), (2) `fill_value`を指定しない場合 : 残りの要素は妥当だが未規定の値となる
- (3), (4) `fill_value`を指定する場合 : 残りの要素は`fill_value`で埋められる

逆の操作は[`expand`](expand.md)である。

## 戻り値
`selector`が`true`である`i`番目の要素を`v`から昇順に取り出して先頭に詰め、残りを未規定値（(1), (2)）または`fill_value`（(3), (4)）で埋めたデータ並列オブジェクト。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return i + 1; });  // {1, 2, 3, 4}

  // 偶数の要素だけを先頭に詰める。残りは0で埋める
  auto selector = (v % 2 == 0);             // {false, true, false, true}
  auto r = simd::compress(v, selector, 0);  // {2, 4, 0, 0}

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::compress[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
2 4 0 0 
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
- [`std::simd::basic_mask`](basic_mask.md)
- [`std::simd::expand`](expand.md)
- [`std::simd::permute`](permute.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2664R11 Proposal to extend `std::simd` with permutation API](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2664r11.html)
    - C++26で置換API（`compress`）が追加された
