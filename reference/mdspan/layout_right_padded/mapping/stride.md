# stride
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_right_padded::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr index_type stride(rank_type r) const noexcept;
```

## 概要
`r`番目次元のストライド幅を取得する。


## 事前条件
`r < rank_`


## 戻り値
- `r == rank_ - 1`のとき、値`1`を返す。
- `r == rank_ - 2`のとき、値`stride-rm2`を返す。
- そうでなければ、半開区間`[r + 1, rank_ - 1)`の全ての値`k`に対して値`stride-rm2`と全ての`extents_.extent(k)`を乗算した値を返す。


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


## 関連項目
- [`strides`](strides.md)


## 参照
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
