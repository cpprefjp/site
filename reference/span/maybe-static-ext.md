# maybe-static-ext
* [meta exposition-only]
* span[meta header]
* variable[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
  constexpr size_t maybe-static-ext = dynamic_extent;  // exposition only
template<integral-constant-like T>
  constexpr size_t maybe-static-ext<T> = {T::value};
```
* dynamic_extent[link dynamic_extent.md]
* integral-constant-like[link integral-constant-like.md]

## 概要
`maybe-static-ext`は、型`T`から[`dynamic_extent`](dynamic_extent.md)または静的要素数を取り出す説明専用定数である。


## バージョン
### 言語
- C++26


## 参照
- [P3029R1 Better `mdspan`'s CTAD](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3029r1.html)
