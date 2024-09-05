# strides
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_left_padded::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr array<index_type, rank_> strides() const noexcept;
```
* array[link /reference/array/array.md]

## 概要
ストライド幅配列を取得する。


## 戻り値
[`array`](/reference/array/array.md)`<index_type, rank_>({`[`stride`](stride.md)`(P_rank)...})`


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
- [`stride`](stride.md)


## 参照
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
