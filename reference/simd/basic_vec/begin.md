# begin
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr iterator begin() noexcept;             // (1) C++26
constexpr const_iterator begin() const noexcept; // (2) C++26
```

## 概要
先頭要素を指すイテレータを取得する。

`basic_vec`は[`begin`](begin.md)/[`end`](end.md)を備えることで、要素を走査できるRangeとして扱える。


## 戻り値
先頭（`0`番目）の要素を指すイテレータ。


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
* v.begin()[color ff0000]
* v.end()[link end.md]

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
- [`std::simd::basic_vec::end`](end.md)
- [`std::simd::basic_vec::cbegin`](cbegin.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`が追加された
- [P3480R6 `std::simd` is a range](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3480r6.pdf)
    - イテレータを追加し、Rangeとして扱えるようになった
