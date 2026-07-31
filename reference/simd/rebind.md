# rebind
* simd[meta header]
* std::simd[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class V>
  struct rebind { using type = /*see below*/; };

  template<class T, class V>
  using rebind_t = rebind<T, V>::type;
}
```

## 概要
`rebind`は、データ並列型`V`（[`basic_vec`](basic_vec.md)または[`basic_mask`](basic_mask.md)）の要素数（「width」）を維持したまま、要素型を`T`に変更した型を取得する型特性である。

メンバ`type`は、`V`がデータ並列型であり、要素型を`T`とし`V`と同じ要素数を持つデータ並列型が存在する場合にのみ存在する。存在するとき`type`は次を表す。

- `V`が[`basic_vec`](basic_vec.md)の特殊化のとき: 要素型`T`・`V`と同じ要素数の`basic_vec`
- `V`が[`basic_mask`](basic_mask.md)の特殊化のとき: 対応する`basic_mask`


## 例
```cpp example
#include <simd>
#include <print>
#include <type_traits>

namespace simd = std::simd;

int main()
{
  using Vi = simd::vec<int, 4>;

  // 要素数4を維持したまま要素型をfloatに変更
  using Vf = simd::rebind_t<float, Vi>;

  std::println("{}", std::is_same_v<Vf, simd::vec<float, 4>>);
}
```
* simd::vec[link basic_vec.md]
* simd::rebind_t[color ff0000]

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
- [`std::simd::resize`](resize.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
