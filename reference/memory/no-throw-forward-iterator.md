# no-throw-forward-iterator
* [meta exposition-only]
* memory[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class I>
  concept no-throw-forward-iterator =
    no-throw-input-iterator<I> &&
    forward_iterator<T> &&
    no-throw-sentinel<T, I>
}
```
* no-throw-input-iterator[link no-throw-input-iterator.md]
* no-throw-sentinel[link no-throw-sentinel.md]

## 概要

`no-throw-forward-iterator`は、イテレータ型`I`が以下の操作で例外を投げない前方向イテレータの説明用コンセプトである：

- インクリメント
- コピー構築
- ムーブ構築
- コピー代入
- ムーブ代入
- 有効なイテレータの間接参照


## 備考
- このコンセプトは[`forward_iterator`](/reference/iterator/forward_iterator.md)のいくつかの操作で例外を投げることを許可する
- このコンセプトは、[`std::vector`](/reference/vector/vector.md)`<bool>`のイテレータのような、プロキシオブジェクトを指すイテレータを除外する


## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>
#include <forward_list>
#include <list>

template <class I>
concept no_throw_input_iterator =
  std::input_iterator<I> &&
  std::is_lvalue_reference_v<std::iter_reference_t<I>> &&
  std::same_as<std::remove_cvref_t<std::iter_reference_t<I>>, std::iter_value_t<I>>;

template<class S, class I>
concept no_throw_sentinel = std::sentinel_for<S, I>;

template<class I>
concept no_throw_forward_iterator =
  no_throw_input_iterator <I> &&
  std::forward_iterator<I> &&
  no_throw_sentinel<I, I>;

template <no_throw_forward_iterator I>
void f(const char* name) {
  std::cout << name << " is no-throw-forward-iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not no-throw-forward-iterator" << std::endl;
}

int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::forward_list<int>::iterator>("std::forward_list<int>::iterator");
  f<std::list<int>::iterator>("std::list<int>::iterator");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<std::vector<bool>::iterator>("std::vector<bool>::iterator");
}
```
* no_throw_forward_iterator[color ff0000]
* std::input_iterator[link /reference/iterator/input_iterator.md]
* std::is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]
* std::iter_reference_t[link /reference/iterator/iter_reference_t.md]
* std::iter_value_t[link /reference/iterator/iter_value_t.md]
* std::same_as[link /reference/concepts/same_as.md]
* std::remove_cvref_t[link /reference/type_traits/remove_cvref.md]
* std::sentinel_for[link /reference/iterator/sentinel_for.md]
* std::forward_iterator[link /reference/iterator/forward_iterator.md]

### 出力
```
int* is no-throw-forward-iterator
const int* is no-throw-forward-iterator
std::forward_list<int>::iterator is no-throw-forward-iterator
std::list<int>::iterator is no-throw-forward-iterator
std::vector<int>::iterator is no-throw-forward-iterator
std::vector<bool>::iterator is not no-throw-forward-iterator
```


## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
