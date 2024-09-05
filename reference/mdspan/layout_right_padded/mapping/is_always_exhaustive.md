# is_always_exhaustive
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_right_padded::mapping[meta class]
* cpp26[meta cpp]

```cpp
static constexpr bool is_always_exhaustive() noexcept;
```

## 概要
型の[Exhaustive特性](../../LayoutMapping.md)を取得する。


## 戻り値
- `rank_`が`0`または`1`のとき、`true`を返す。
- `static-padding-stride`または`last-static-extent`のいずれも[`dynamic_extent`](/reference/span/dynamic_extent.md)に等しくないとき、`static-padding-stride == last-static-extent`を返す。
- そうではないとき、`false`を返す。


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
