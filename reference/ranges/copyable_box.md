# copyable-box
* ranges[meta header]
* class template[meta id-type]
* cpp20[meta cpp]

## 概要

`copyable-box` は、規格の文中に現れる説明専用のクラスである。

`copyable-box<T>` は、[`std::optional`](/reference/optional/optional.md)`<T>`とほとんど同じであるものの、
`T` が `copyable`のモデルであるか、`is_nothrow_move_constructible_v<T> && is_nothrow_copy_constructible_v<T>`を満たす場合のみ値を保持する。

具体的には以下の差分がある。

### 差分1
テンプレートパラメーター制約 `copy_constructible<T> && is_object_v<T>` をもつ。

### 差分2
`T`が[`copyable`](/reference/concepts/copyable.md)のモデルでない場合、コピー代入演算子は以下のように定義される。

```cpp
constexpr copyable-box& operator=(const copyable-box& that) noexcept(is_nothrow_copy_constructible_v<T>) {
  if (this != addressof(that)) {
    if (that) emplace(*that);
    else reset();
  }
  return *this;
}
```
* copyable-box[italic]
* is_nothrow_copy_constructible_v[link /reference/type_traits/is_nothrow_copy_constructible.md]
* addressof[link /reference/memory/addressof.md]
* emplace[link /reference/optional/optional/emplace.md]
* reset[link /reference/optional/optional/reset.md]

### 差分3
`T`が[`copyable`](/reference/concepts/copyable.md)のモデルでない場合、ムーブ代入演算子は以下のように定義される。

```cpp
constexpr copyable-box& operator=(copyable-box&& that) noexcept(is_nothrow_move_constructible_v<T>) {
  if (this != addressof(that)) {
    if (that) emplace(std::move(*that));
    else reset();
  }
  return *this;
}
```
* copyable-box[italic]
* is_nothrow_copy_constructible_v[link /reference/type_traits/is_nothrow_copy_constructible.md]
* addressof[link /reference/memory/addressof.md]
* emplace[link /reference/optional/optional/emplace.md]
* reset[link /reference/optional/optional/reset.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
