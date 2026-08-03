# resize
* simd[meta header]
* std::simd[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-size-type N, class V>
  struct resize { using type = /*see below*/; };

  template<simd-size-type N, class V>
  using resize_t = resize<N, V>::type;
}
```
* simd-size-type[link /reference/simd/simd-size-type.md]

## 概要
`resize`は、データ並列型`V`（[`basic_vec`](basic_vec.md)または[`basic_mask`](basic_mask.md)）の要素型を維持したまま、要素数（「width」）を`N`に変更した型を取得する型特性である。

メンバ`type`は、`V`がデータ並列型であり、要素数`N`を表現できるデータ並列型が存在する場合にのみ存在する。存在するとき`type`は、`V`と同じ要素型で要素数`N`のデータ並列型を表す。

[`permute`](permute.md)や[`chunk`](chunk.md)・[`cat`](cat.md)など、要素数が変化する操作の戻り値型に用いられる。


## 例
```cpp example
#include <simd>
#include <print>
#include <type_traits>

namespace simd = std::simd;

int main()
{
  using V4 = simd::vec<int, 4>;

  // 要素型intを維持したまま要素数を8に変更
  using V8 = simd::resize_t<8, V4>;

  std::println("{}", std::is_same_v<V8, simd::vec<int, 8>>);
}
```
* simd::vec[link basic_vec.md]
* simd::resize_t[color ff0000]

### 出力
```
true
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::rebind`](rebind.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
