# コンストラクタ
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* scaled_accessor[meta class]
* cpp26[meta cpp]

```cpp
constexpr scaled_accessor() = default; // (1)

template<class OtherNestedAccessor>
explicit(!is_convertible_v<OtherNestedAccessor, NestedAccessor>)
constexpr scaled_accessor(const scaled_accessor<ScalingFactor, OtherNestedAccessor>& other); // (2)

constexpr scaled_accessor(const ScalingFactor& s, const NestedAccessor& a); // (3)
```
* is_convertible_v[link /reference/type_traits/is_convertible.md]
* NestedAccessor[link /reference/mdspan/AccessorPolicy.md]
* OtherNestedAccessor[link /reference/mdspan/AccessorPolicy.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 他`scaled_accessor`からの変換コンストラクタ
- (3) : `ScalingFactor`と`NestedAccessor`から構築


## 効果
- (2) : `scaling-factor`を`other.scaling_factor()`で、`nested-accessor`を`other.nested_accessor()`で直接非リスト初期化する。
- (3) : `scaling-factor`を`s`で、`nested-accessor`を`a`で直接非リスト初期化する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
