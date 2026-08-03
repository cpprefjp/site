# minmax
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi>
  constexpr std::pair<basic_vec<T, Abi>, basic_vec<T, Abi>>
    minmax(const basic_vec<T, Abi>& a,
           const basic_vec<T, Abi>& b) noexcept;  // C++26
}
```

## 概要
`minmax`は、2つの[`basic_vec`](basic_vec.md)から、要素ごとの最小値と最大値をまとめて取得する関数である。結果は[`std::pair`](/reference/utility/pair.md)の`first`に最小値、`second`に最大値が格納される。

## 効果
以下と等価である：

```cpp
return std::pair{min(a, b), max(a, b)};
```
* min[link min.md]
* max[link max.md]

## 戻り値
`first`が[`min`](min.md)`(a, b)`、`second`が[`max`](max.md)`(a, b)`である[`std::pair`](/reference/utility/pair.md)。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a([](int i) { return i; });     // {0, 1, 2, 3}
  simd::vec<int, 4> b([](int i) { return 3 - i; }); // {3, 2, 1, 0}

  // 要素ごとの最小値・最大値をまとめて取得
  auto [lo, hi] = simd::minmax(a, b);

  for (int i = 0; i < lo.size(); ++i)
    std::print("{} ", lo[i]);
  std::println("");

  for (int i = 0; i < hi.size(); ++i)
    std::print("{} ", hi[i]);
  std::println("");
}
```
* simd::minmax[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
0 1 1 0 
3 2 2 3 
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
- [`std::simd::clamp`](clamp.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
