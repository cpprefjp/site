# expand
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-vec-type V>
  constexpr V
    expand(const V& v,
           const typename V::mask_type& selector,
           const V& original = {});                // (1) C++26
  template<simd-mask-type V>
  constexpr V
    expand(const V& v,
           const type_identity_t<V>& selector,
           const V& original = {});                // (2) C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]
* simd-mask-type[link /reference/simd/simd-mask-type.md]

## 概要
`expand`は、[`compress`](compress.md)の逆操作を行う関数である。先頭に詰められたデータ並列オブジェクト`v`の要素を、マスク`selector`が`true`である位置へ順番に展開する。

`selector`が`true`である位置には、`v`の先頭から昇順に要素が配置される。`selector`が`false`である位置には、`original`の対応する要素が配置される。

## 戻り値
`i`番目の要素について、`selector[i]`が`true`ならば`v`の対応する要素、`false`ならば`original[i]`で初期化されたデータ並列オブジェクト。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  // 先頭に詰められた値
  simd::vec<int, 4> v([](int i) { return i + 1; });  // {1, 2, 3, 4}

  // trueの位置へ v の先頭から順に展開する。falseの位置は original(=0) となる
  simd::vec<int, 4>::mask_type selector([](int i) { return i % 2 == 1; });
                                             // {false, true, false, true}
  auto r = simd::expand(v, selector);   // {0, 1, 0, 2}

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::expand[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
0 1 0 2 
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
- [`std::simd::permute`](permute.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2664R11 Proposal to extend `std::simd` with permutation API](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2664r11.html)
    - C++26で置換API（`expand`）が追加された
