# possibly-const-range
* [meta exposition-only]
* ranges[meta header]
* std::ranges[meta namespace]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_range R>
  constexpr auto& possibly-const-range(R& r) noexcept {
    if constexpr (constant_range<const R> && !constant_range<R>) {
      return const_cast<const R&>(r);
    } else {
      return r;
    }
  }
}
```

## 概要

`possibly-const-range`は入力の`input_range`オブジェクト`r`を、可能なら要素が定数化された`range`へ変換するものである。

主に、`ranges::cbegin()`など定数イテレータを取得したい場所で、イテレータ取得前の段階で`range`型の簡単な変換のみで定数イテレータを取得できるかを試行するのに使用される。


## バージョン
### 言語
- C++23

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
- [LWG Issue 3948. `possibly-const-range` and `as-const-pointer` should be `noexcept`](https://cplusplus.github.io/LWG/issue3948)
