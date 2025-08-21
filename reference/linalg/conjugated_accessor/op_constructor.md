# コンストラクタ
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* conjugated_accessor[meta class]
* cpp26[meta cpp]

```cpp
constexpr conjugated_accessor() = default; // (1)

template<class OtherNestedAccessor>
explicit(!is_convertible_v<OtherNestedAccessor, NestedAccessor>)
constexpr conjugated_accessor(const conjugated_accessor<OtherNestedAccessor>& other); // (2)

constexpr conjugated_accessor(const NestedAccessor& acc); // (3)
```
* is_convertible_v[link /reference/type_traits/is_convertible.md]
* NestedAccessor[link /reference/mdspan/AccessorPolicy.md]
* OtherNestedAccessor[link /reference/mdspan/AccessorPolicy.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 他`conjugated_accessor`からの変換コンストラクタ
- (3) : `NestedAccessor`から構築


## テンプレートパラメータ制約
- (2) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<NestedAccessor, const OtherNestedAccessor&> == true`


## 効果
- (2) : `nested-accessor_`を`other.nested_accessor()`で直接非リスト初期化する。
- (3) : `nested-accessor_`を`acc`で直接非リスト初期化する。


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
