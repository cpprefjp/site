# コンストラクタ
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* default_accessor[meta class]
* cpp23[meta cpp]

```cpp
constexpr default_accessor() noexcept = default;  // (1)

template<class OtherElementType>
constexpr default_accessor(default_accessor<OtherElementType>) noexcept;  // (2)
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 他`default_accessor`からの変換コンストラクタ


## テンプレートパラメータ制約
- (2) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherElementType(*)[], element_type(*)[]>`が`true`であること


## 例外
投げない


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2599R2 `index_type` & `size_type` in `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2599r2.pdf)
