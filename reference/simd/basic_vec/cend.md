# cend
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr default_sentinel_t cend() const noexcept;
```
* default_sentinel_t[link /reference/iterator/default_sentinel_t.md]

## 概要
末尾を表す番兵を取得する。

読み取り専用イテレータ[`cbegin`](cbegin.md)と対で用いる。要素数は静的に決まるため、末尾は番兵[`std::default_sentinel_t`](/reference/iterator/default_sentinel_t.md)で表される。


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

  for (auto it = v.cbegin(); it != v.cend(); ++it) {
    std::print("{} ", *it);
  }
  std::println("");
}
```
* v.cend()[color ff0000]
* v.cbegin()[link cbegin.md]

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
- [`std::simd::basic_vec::cbegin`](cbegin.md)
- [`std::simd::basic_vec::end`](end.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`が追加された
- [P3480R6 `std::simd` is a range](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3480r6.pdf)
    - イテレータを追加し、Rangeとして扱えるようになった
