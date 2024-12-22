# コンストラクタ
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* aligned_accessor[meta class]
* cpp26[meta cpp]

```cpp
constexpr aligned_accessor() noexcept = default;  // (1)

template<class OtherElementType, size_t OtherByteAlignment>
constexpr aligned_accessor(
  aligned_accessor<OtherElementType, OtherByteAlignment>) noexcept;  // (2)

template<class OtherElementType>
explicit constexpr aligned_accessor(
  default_accessor<OtherElementType>) noexcept;  // (3)
```
* default_accessor[link ../default_accessor.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 他`aligned_accessor`からの変換コンストラクタ
- (3) : [`default_accessor`](../default_accessor.md)からの変換コンストラクタ


## テンプレートパラメータ制約
- (2) :
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherElementType(*)[], element_type(*)[]>`が`true`であること
    - `OtherByteAlignment > byte_alignment`
- (3) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherElementType(*)[], element_type(*)[]>`が`true`であること


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
