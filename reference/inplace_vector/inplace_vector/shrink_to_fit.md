# shrink_to_fit
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr void shrink_to_fit(); // (1) C++26
```

## 概要
なにもしない。`inplace_vector`の容量は固定であるため、この関数は何の効果も持たない。

[`std::vector::shrink_to_fit()`](/reference/vector/vector/shrink_to_fit.md)との互換性のために提供されている。


## 効果
なし


## 戻り値
なし


## 計算量
定数時間


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
