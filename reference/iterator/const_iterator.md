# const_iterator
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<input_iterator I>
  using const_iterator = /*see below*/;
}
```
* input_iterator[link input_iterator.md]

## 概要

任意のイテレータ型`I`を、定数イテレータ型へ変換する。

## 効果

- `I`が[`constant-iterator`](constant-iterator.md)のモデルとなる場合 : `I`
- それ以外の場合 : [`basic_const_iterator`](basic_const_iterator.md)`<I>`

## 例
```cpp example
#include <iterator>

int main() {
  static_assert(std::same_as<std::const_iterator<int*>, std::basic_const_iterator<int*>>);
  static_assert(std::same_as<std::const_iterator<const int*>, const int*>);

  using vec_iter = std::vector<int>::iterator;
  
  static_assert(std::same_as<std::const_iterator<vec_iter>, std::basic_const_iterator<vec_iter>>);
  static_assert(std::same_as<std::const_iterator<std::const_iterator<vec_iter>>, std::const_iterator<vec_iter>>);
}
```
* std::const_iterator[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
