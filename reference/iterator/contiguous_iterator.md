# contiguous_iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept contiguous_iterator =
    input_or_output_iterator<I> &&
    indirectly_readable<I> &&
    requires { typename ITER_CONCEPT(I); } &&
    derived_from<ITER_CONCEPT(I), contiguous_iterator_tag>;
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* contiguous_iterator_tag[link /reference/iterator/contiguous_iterator_tag.md]
* derived_from[link /reference/concepts/derived_from.md]

## 概要

`contiguous_iterator`は、イテレータ型`I`が入力イテレータであることを表すコンセプトである。

`contiguous_iterator`となるイテレータは、`operator*`による読み出しと前置/後置インクリメントによる進行が可能である。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>

template<std::contiguous_iterator I>
void f(const char* name) {
  std::cout << name << " is contiguous_iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not contiguous_iterator" << std::endl;
}


struct sample_contiguous_iterator {
  friend auto operator++(sample_contiguous_iterator&) -> sample_contiguous_iterator&;
  friend auto operator++(sample_contiguous_iterator&, int) -> sample_contiguous_iterator;

  friend auto operator*(const sample_contiguous_iterator&) -> int&;

  using difference_type = int;
  using value_type = int;
  using iterator_concept = std::contiguous_iterator_tag;
};


int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<std::istream_iterator<double>>("std::istream_iterator<double>");
  f<sample_contiguous_iterator>("sample_contiguous_iterator");
  
  std::cout << "\n";
  f<int* const>("int* const");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
}
```
* std::contiguous_iterator[color ff0000]

### 出力
```
int* is contiguous_iterator
const int* is contiguous_iterator
std::vector<int>::iterator is contiguous_iterator
std::istream_iterator<double> is contiguous_iterator
sample_contiguous_iterator is contiguous_iterator

int* const is not contiguous_iterator
std::ostream_iterator<double> is not contiguous_iterator
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
