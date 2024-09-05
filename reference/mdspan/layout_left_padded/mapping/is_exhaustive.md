# is_exhaustive
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_left_padded::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr bool is_exhaustive() const noexcept;
```

## 概要
レイアウトマッピングの[Exhaustive特性](../../LayoutMapping.md)を取得する。

## 戻り値
- `rank_`が`0`または`1`のとき、`true`を返す。
- そうではないとき、`extents_.extent(0) == stride(1)`を返す。


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
