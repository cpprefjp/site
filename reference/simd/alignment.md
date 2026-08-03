# alignment
* simd[meta header]
* std::simd[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class U = typename T::value_type>
  struct alignment { /*see below*/ };

  template<class T, class U = typename T::value_type>
  constexpr std::size_t alignment_v = alignment<T, U>::value;
}
```

## 概要
`alignment`は、データ並列型`T`（[`basic_vec`](basic_vec.md)または[`basic_mask`](basic_mask.md)）を、要素型`U`の配列に対してアライメント済みで読み込み／書き込むために必要な、メモリ先頭のアライメント（バイト数）を取得する型特性である。

[`flag_aligned`](flags.md)を指定して読み込み／書き込む場合、メモリ先頭はこの`alignment_v<T, U>`バイト境界にアライメントされていなければならない。

メンバ定数`value`は、`T`がデータ並列型であり、要素型`U`との間で（変換）読み込み／書き込みが可能な場合にのみ存在する。


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  using V = simd::vec<float, 4>;

  std::println("{}", simd::alignment_v<V>);
}
```
* simd::vec[link basic_vec.md]
* simd::alignment_v[color ff0000]

### 出力例
```
16
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::flags`](flags.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
