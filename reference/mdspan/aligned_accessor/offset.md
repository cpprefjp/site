# offset
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* aligned_accessor[meta class]
* cpp26[meta cpp]

```cpp
constexpr typename offset_policy::data_handle_type
  offset(data_handle_type p, size_t i) const noexcept;
```

## 概要
指定オフセット位置のハンドルを取得する。


## 事前条件
- 半開区間`[0, i+1)`が有効な範囲であり、かつ
- [`is_sufficiently_aligned`](/reference/memory/is_sufficiently_aligned.md)`<byte_alignment>(p)`が`true`であること。


## 効果
`return` [`assume_aligned`](/reference/memory/assume_aligned.md)`<byte_alignment>(p) + i;`と等価


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
- [P2897R7 `aligned_accessor`: An mdspan accessor expressing pointer over-alignment](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2897r7.html)
