# derived
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr D& derived() noexcept {                   // exposition only
  return static_cast<D&>(*this);
}

constexpr const D& derived() const noexcept {       // exposition only
  return static_cast<const D&>(*this);
}
```
* derived[italic]

## 概要
派生クラスの参照にダウンキャストする説明用の`private`メンバ関数。

## バージョン
### 言語
- C++20

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
