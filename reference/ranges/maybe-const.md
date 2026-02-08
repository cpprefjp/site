# maybe-const
* [meta exposition-only]
* ranges[meta header]
* type-alias[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<bool Const, class T>
  using maybe-const = conditional_t<Const, const T, T>;
}
```

## 概要

`maybe-const<Const, T>` は、bool値`Const`が`true`のとき `const T`、`false`のとき`T`となる説明専用の型エイリアスである。

## バージョン
### 言語
- C++23

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
