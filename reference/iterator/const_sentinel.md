# const_sentinel
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<semiregular S>
  using const_sentinel = see below;
}
```
* semiregular[link /reference/concepts/semiregular.md]

## 概要

任意の番兵型`S`を、定数イテレータ型（[`const_iterator`](const_iterator.md)）に対応する番兵型へ変換する。

## 効果

- `S`が[`input_iterator`](input_iterator.md)のモデルとなる場合 : [`const_iterator`](const_iterator.md)`<S>`
- それ以外の場合 : `S`

## 例
```cpp example
#include <iterator>
#include <vector>

int main() {
  static_assert(std::same_as<std::const_sentinel<int*>, std::basic_const_iterator<int*>>);
  static_assert(std::same_as<std::const_sentinel<const int*>, const int*>);

  using vec_iter = std::vector<int>::iterator;
  
  static_assert(std::same_as<std::const_sentinel<vec_iter>, std::basic_const_iterator<vec_iter>>);
  static_assert(std::same_as<std::const_sentinel<std::const_iterator<vec_iter>>, std::const_iterator<vec_iter>>);
  
  static_assert(std::same_as<std::const_sentinel<std::default_sentinel_t>, std::default_sentinel_t>);
  static_assert(std::same_as<std::const_sentinel<std::unreachable_sentinel_t>, std::unreachable_sentinel_t>);
}
```
* std::const_sentinel[color ff0000]
* std::default_sentinel_t[link /reference/iterator/default_sentinel_t.md]
* std::unreachable_sentinel_t[link /reference/iterator/unreachable_sentinel_t.md]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
