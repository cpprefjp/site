# permute
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  // 特殊なインデックス値
  inline constexpr simd-size-type zero_element   = /*処理系定義*/;  // (1) C++26
  inline constexpr simd-size-type uninit_element = /*処理系定義*/;  // (2) C++26

  // 静的置換
  template<simd-size-type N = /*see below*/, simd-vec-type V, class IdxMap>
  constexpr resize_t<N, V> permute(const V& v, IdxMap&& idxmap);          // (3) C++26
  template<simd-size-type N = /*see below*/, simd-mask-type V, class IdxMap>
  constexpr resize_t<N, V> permute(const V& v, IdxMap&& idxmap);          // (4) C++26

  // 動的置換
  template<simd-vec-type V, simd-integral I>
  constexpr resize_t<I::size(), V> permute(const V& v, const I& indices); // (5) C++26
  template<simd-mask-type V, simd-integral I>
  constexpr resize_t<I::size(), V> permute(const V& v, const I& indices); // (6) C++26
}
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* simd-vec-type[link /reference/simd/simd-vec-type.md]
* simd-mask-type[link /reference/simd/simd-mask-type.md]
* simd-integral[link /reference/simd/simd-integral.md]
* zero_element[color ff0000]
* uninit_element[color ff0000]

## 概要
`permute`は、[`basic_vec`](basic_vec.md)や[`basic_mask`](basic_mask.md)の要素を、指定したインデックスのマッピングに従って並べ替える（置換する）関数である。結果の各要素は、元のデータ並列オブジェクトのいずれかの要素からコピーされる。

- (3), (4) 静的置換 : インデックスをマッピングする関数`idxmap`を渡す。結果の`i`番目の要素は、元のオブジェクトの`idxmap(i)`番目（または`idxmap(i, V::size())`番目）の要素で初期化される。マッピング関数はコンパイル時に評価される必要がある。テンプレート引数`N`によって結果の要素数を変更でき、既定では元の要素数（`V::size()`）となる
- (5), (6) 動的置換 : インデックスをまとめたデータ並列型`indices`を渡す。結果の`i`番目の要素は、元のオブジェクトの`indices[i]`番目の要素で初期化される。インデックスは実行時に決定してよい。結果の要素数は`indices`の要素数（`I::size()`）となる

静的置換のマッピング関数`idxmap`は、通常のインデックスのほかに、以下の特殊値を返してよい。

- (1) `zero_element` : その要素を、要素型のゼロ値（`value_type()`）で初期化する
- (2) `uninit_element` : その要素を、未規定の値のままにする

## テンプレートパラメータ制約
- (3), (4) : `std::invoke_result_t<IdxMap&, simd-size-type>`と`std::invoke_result_t<IdxMap&, simd-size-type, simd-size-type>`の少なくとも一方が[`std::integral`](/reference/concepts/integral.md)のモデルであること

## 適格要件
- (3), (4) : すべての`i`（`[0, N)`の範囲）について、`idxmap`を適用した結果が定数式であり、その値が`zero_element`・`uninit_element`・`[0, V::size())`の範囲のいずれかであること

## 事前条件
- (5), (6) : `indices`のすべての値が`[0, V::size())`の範囲にあること

## 戻り値
- (3), (4) : `i`番目の要素が、`idxmap`の適用結果に応じて、元のオブジェクトの対応要素・ゼロ値・未規定値のいずれかで初期化されたデータ並列オブジェクト
- (5), (6) : `i`番目の要素が`v[indices[i]]`で初期化されたデータ並列オブジェクト

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return i; });  // {0, 1, 2, 3}

  // 静的置換: 逆順に並べ替える
  auto r = simd::permute(v, [](int i) { return 3 - i; });  // {3, 2, 1, 0}

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");

  // 動的置換: 実行時のインデックスで並べ替える
  simd::vec<int, 4> idx([](int i) { return (i + 1) % 4; });  // {1, 2, 3, 0}
  auto d = simd::permute(v, idx);                            // {1, 2, 3, 0}

  for (int i = 0; i < d.size(); ++i)
    std::print("{} ", d[i]);
  std::println("");
}
```
* simd::permute[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
3 2 1 0 
1 2 3 0 
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
- [`std::simd::compress`](compress.md)
- [`std::simd::expand`](expand.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2664R11 Proposal to extend `std::simd` with permutation API](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2664r11.html)
    - C++26で置換API（`permute`）が追加された
