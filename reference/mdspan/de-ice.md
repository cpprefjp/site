# de-ice
* [meta exposition-only]
* mdspan[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
constexpr T de-ice(T val) { return val; }

template<integral-constant-like T>
constexpr auto de-ice(T) { return T::value; }
```
* integral-constant-like[link /reference/span/integral-constant-like.md]

## 概要
`de-ice`は[`submdspan`](submdspan.md)動作説明用の関数テンプレートである。


## バージョン
### 言語
- C++26


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
