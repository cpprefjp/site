# end
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr default_sentinel_t end() const noexcept;
```
* default_sentinel_t[link /reference/iterator/default_sentinel_t.md]

## 概要
末尾を表す番兵を取得する。

`basic_vec`は[`begin`](begin.md)/[`end`](end.md)を備えることで、要素を走査できるRangeとして扱える。要素数は静的に決まるため、末尾は番兵[`std::default_sentinel_t`](/reference/iterator/default_sentinel_t.md)で表される。


## 戻り値
番兵[`std::default_sentinel`](/reference/iterator/default_sentinel_t.md)。


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

  for (auto it = v.begin(); it != v.end(); ++it) {
    std::print("{} ", *it);
  }
  std::println("");
}
```
* v.end()[color ff0000]
* v.begin()[link begin.md]

### 出力
```
1 2 3 4 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec::begin`](begin.md)
- [`std::simd::basic_vec::cend`](cend.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`が追加された
- [P3480R6 `std::simd` is a range](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3480r6.pdf)
    - イテレータを追加し、Rangeとして扱えるようになった
