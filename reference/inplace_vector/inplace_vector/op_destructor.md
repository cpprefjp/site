# デストラクタ
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr ~inplace_vector(); // (1) C++26
```

## 概要
`inplace_vector`が保持している全ての要素に対してデストラクタを実行する。[`vector`](/reference/vector/vector.md)と異なり、動的メモリの解放は行わない。


## 例外
投げない


## 計算量
全要素のデストラクタを呼び出すために線形時間。

[`std::is_trivially_destructible_v<T>`](/reference/type_traits/is_trivially_destructible.md)が`true`の場合、定数時間となりうる。


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
