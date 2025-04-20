# contiguous_iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept contiguous_iterator =
    random_access_iterator<I> &&
    derived_from<ITER_CONCEPT(I), contiguous_iterator_tag> &&
    is_lvalue_reference_v<iter_reference_t<I>> &&
    same_as<iter_value_t<I>, remove_cvref_t<iter_reference_t<I>>> &&
    requires(const I& i) {
      { to_address(i) } -> same_as<add_pointer_t<iter_reference_t<I>>>;
    };
}
```
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* derived_from[link /reference/concepts/derived_from.md]
* ITER_CONCEPT[link /reference/iterator/input_iterator.md#iter_concept]
* contiguous_iterator_tag[link /reference/iterator/iterator_tag.md]
* is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* to_address[link /reference/memory/to_address.md]
* add_pointer_t[link /reference/type_traits/add_pointer.md]

## 概要

`contiguous_iterator`は、イテレータ型`I`が隣接イテレータであることを表すコンセプトである。

`contiguous_iterator`となるイテレータは、[ランダムアクセスイテレータ](random_access_iterator.md)であり、参照する要素列がメモリ上で連続していることが保証される。

C++20で導入された`contiguous_iterator`は、要素がメモリー上で連続していることを保証しているが、C++23の標準ライブラリ実装では
得られたポインタに対してさらなるポインタ演算を行う演算は許可されていなかった。

しかし、C++26からは、この制限が緩和され、`std::to_address`関数を使用して得られたポインタに対してさらなるポインタ演算を行うことができるようになった。

## モデル

`a, b`を間接参照可能なイテレータ、`c`を間接参照不可能なイテレータとし、`b`は`a`から、`c`は`b`からそれぞれ到達可能であるとする。そのような型`I`のイテレータ`a, b, c`と[`iter_difference_t<I>`](/reference/iterator/iter_difference_t.md)の示す型`D`について次の条件を満たす場合に限って、型`I`は`contiguous_iterator`のモデルである。

- `to_address(a) == addressof(*a)`
- `to_address(b) == to_address(a) + D(b - a)`
- `to_address(c) == to_address(a) + D(c - a)`

## 例
```cpp example

#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <forward_list>
#include <list>
#include <deque>

template<std::contiguous_iterator I>
void f(const char* name) {
  std::cout << name << " is contiguous_iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not contiguous_iterator" << std::endl;
}

int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  
  std::cout << "\n";
  f<int* const>("int* const");
  f<std::forward_list<int>::iterator>("std::forward_list<int>::iterator");
  f<std::list<int>::iterator>("std::list<int>::iterator");
  f<std::deque<int>::iterator>("std::deque<int>::iterator");
  f<std::istream_iterator<double>>("std::istream_iterator<double>");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
}
```
* std::contiguous_iterator[color ff0000]

### 出力
```
int* is contiguous_iterator
const int* is contiguous_iterator
std::vector<int>::iterator is contiguous_iterator

int* const is not contiguous_iterator
std::forward_list<int>::iterator is not contiguous_iterator
std::list<int>::iterator is not contiguous_iterator
std::deque<int>::iterator is not contiguous_iterator
std::istream_iterator<double> is not contiguous_iterator
std::ostream_iterator<double> is not contiguous_iterator
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P1474R1 Helpful pointers for `ContiguousIterator`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1474r1.pdf)
- [P3349R1 Converting contiguous iterators to pointers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3349r1.html)