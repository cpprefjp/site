# cbegin
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr const_iterator cbegin() const noexcept; // (1) C++26
```

## 概要
先頭要素を指す読み取り専用イテレータを取得する。


## 戻り値
先頭要素（添字`0`の要素）を指す読み取り専用イテレータ


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::mask<int, 4> m = [](int i) { return i % 2 == 0; };  // {true, false, true, false}

  for (auto it = m.cbegin(); it != m.cend(); ++it) {
    std::print("{} ", *it);
  }
  std::println("");
}
```
* simd::mask[link ../basic_mask.md]
* m.cbegin()[color ff0000]
* m.cend()[link cend.md]

### 出力
```
true false true false 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`begin`](begin.md)
- [`end`](end.md)
- [`cend`](cend.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3480R6 `std::simd` is a range](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3480r6.pdf)
    - イテレータを追加し、Rangeとして扱えるようになった
