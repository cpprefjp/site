# required_span_size
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_left_padded::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr index_type required_span_size() const noexcept;
```

## 概要
メモリブロックに対する要素アクセス範囲を取得する。


## 戻り値
- 多次元インデクス空間`extents_`のサイズが0のとき、値`0`を返す。
- そうではないとき、`*this(((extents_(P_rank) - index_type(1))...)) + 1`を返す。


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
