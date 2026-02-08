# movable-box
* [meta exposition-only]
* ranges[meta header]
* class template[meta id-type]
* cpp23[meta cpp]

## 概要

`movable-box` は、規格の文中に現れる説明専用のクラスである。

`movable-box<T>` は、[`std::optional`](/reference/optional/optional.md)`<T>`とほとんど同じであるが、以下の差分をもつ。

### 差分1
テンプレートパラメーター制約 [`move_constructible`](/reference/concepts/move_constructible.md)`<T> &&` [`is_object_v`](/reference/type_traits/is_object.md)`<T>` をもつ。

### 差分2
`T`が[`copyable`](/reference/concepts/copyable.md)のモデルでない場合、コピー代入演算子は以下のように定義される。

```cpp
constexpr movable-box& operator=(const movable-box& that) noexcept(is_nothrow_copy_constructible_v<T>) {
  if (this != addressof(that)) {
    if (that) emplace(*that);
    else reset();
  }
  return *this;
}
```
* movable-box[italic]
* is_nothrow_copy_constructible_v[link /reference/type_traits/is_nothrow_copy_constructible.md]
* emplace[link /reference/optional/optional/emplace.md]
* reset[link /reference/optional/optional/reset.md]

### 差分3
`T`が[`movable`](/reference/concepts/movable.md)のモデルでない場合、ムーブ代入演算子は以下のように定義される。

```cpp
constexpr movable-box& operator=(movable-box&& that) noexcept(is_nothrow_move_constructible_v<T>) {
  if (this != addressof(that)) {
    if (that) emplace(std::move(*that));
    else reset();
  }
  return *this;
}
```
* movable-box[italic]
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]
* emplace[link /reference/optional/optional/emplace.md]
* reset[link /reference/optional/optional/reset.md]

### その他

以下のことが推奨される。

- [`copy_constructible`](/reference/concepts/copy_constructible.md)`<T>` なら、`movable-box<T>` は
`T` が [`copyable`](/reference/concepts/copyable.md)のモデルであるか、[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> &&` [`is_nothrow_copy_constructible_v`](/reference/type_traits/is_nothrow_copy_constructible.md)`<T>`を満たす場合のみ値を保持する。
- そうでなければ、`movable-box<T>` は
`T` が [`movable`](/reference/concepts/movable.md)のモデルであるか、[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T>`を満たす場合のみ値を保持する。

## 備考

このクラスは、[`copyable-box`](copyable_box.md)を置き換える形で導入された。

## バージョン
### 言語
- C++23

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
- [P2494R2 Relaxing range adaptors to allow for move only types](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2494r2.html)
