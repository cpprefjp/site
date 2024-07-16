# no-throw-input-iterator
* memory[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class I>
  concept no-throw-input-iterator =
    input_iterator<I> &&
    is_lvalue_reference_v<iter_reference_t<I>> &&
    same_as<remove_cvref_t<iter_reference_t<I>>, iter_value_t<I>>;
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]

## 概要

`no-throw-input-iterator`は、イテレータ型`I`が以下の操作で例外を投げない入力イテレータの説明用コンセプトである：

- インクリメント
- コピー構築
- ムーブ構築
- コピー代入
- ムーブ代入
- 有効なイテレータの間接参照


## 備考
- このコンセプトは[`input_iterator`](/reference/iterator/input_iterator.md)のいくつかの操作で例外を投げることを許可する
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

template <no_throw_input_iterator I>
void f(const char* name) {
  std::cout << name << " is no-throw-input-iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not no-throw-input-iterator" << std::endl;
}

int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::forward_list<int>::iterator>("std::forward_list<int>::iterator");
  f<std::list<int>::iterator>("std::list<int>::iterator");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<std::vector<bool>::iterator>("std::vector<bool>::iterator");

  std::cout << "\n";
}
```
* no_throw_input_iterator[color ff0000]
* std::input_iterator[link /reference/iterator/input_iterator.md]
* std::is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]
* std::iter_reference_t[link /reference/iterator/iter_reference_t.md]
* std::iter_value_t[link /reference/iterator/iter_value_t.md]
* std::same_as[link /reference/concepts/same_as.md]
* std::remove_cvref_t[link /reference/type_traits/remove_cvref.md]
* std::forward_list[link /reference/forward_list/forward_list.md]
* std::list[link /reference/list/list.md]

### 出力
```
int* is no-throw-input-iterator
const int* is no-throw-input-iterator
std::forward_list<int>::iterator is no-throw-input-iterator
std::list<int>::iterator is no-throw-input-iterator
std::vector<int>::iterator is no-throw-input-iterator
std::vector<bool>::iterator is not no-throw-input-iterator
```


## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
