# operator->
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr const auto* operator->() const
  requires is_lvalue_reference_v<iter_reference_t<Iterator>> &&
           same_as<remove_cvref_t<iter_reference_t<Iterator>>, value_type>;
```
* is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* same_as[link /reference/concepts/same_as.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]

## 概要

イテレータを通して参照先の要素のメンバにアクセスする

## 戻り値

ラップするイテレータを`current_`というメンバに保持するとして

- `Iterator`が[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)のモデルとなる場合
    - [`to_address`](/reference/memory/to_address.md)`((current_))`
- それ以外の場合
    - [`addressof`](/reference/memory/addressof.md)`(*current_)`

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

struct S {
  int n;

  void print() const {
    std::cout << "call const : " << this->n << '\n';
  }

  void print() {
    std::cout << "call non const : " << this->n << '\n';
  }
};

int main() {
  std::vector<S> vec = {S{1}, S{3}};

  std::basic_const_iterator cit = vec.begin();

  cit->print();
}
```
* cit->[color ff0000]

### 出力
```
call const : 1
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
