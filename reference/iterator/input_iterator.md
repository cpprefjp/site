# input_iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept input_iterator =
    input_or_output_iterator<I> &&
    indirectly_readable<I> &&
    requires { typename ITER_CONCEPT(I); } &&
    derived_from<ITER_CONCEPT(I), input_iterator_tag>;
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* input_iterator_tag[link /reference/iterator/iterator_tag.md]
* derived_from[link /reference/concepts/derived_from.md]

## 概要

`input_iterator`は、イテレータ型`I`が入力イテレータであることを表すコンセプトである。

`input_iterator`となるイテレータは、`operator*`による読み出しと前置/後置インクリメントによる進行が可能である。

## <a href="#iter_concept" id="iter_concept ">`ITER_CONCEPT`</a>

型`I`について、`std::iterator_traits<I>`がプライマリテンプレートの特殊化となる場合、`ITER_TRAITS(I)`を`I`とする。それ以外の場合（`std::iterator_traits<I>`の特殊化が存在する場合）、`ITER_TRAITS(I)`を`std::iterator_traits<I>`とする。

1. `ITER_TRAITS(I)::itertor_concept`が有効で型名を示す場合、`ITER_CONCEPT(I)`は`ITER_TRAITS(I)::itertor_concept`
2. `ITER_TRAITS(I)::itertor_category`が有効で型名を示す場合、`ITER_CONCEPT(I)`は`ITER_TRAITS(I)::itertor_category`
3. `std::iterator_traits<I>`がプライマリテンプレートの特殊化となる場合、`ITER_CONCEPT(I)`は`random_access_iterator_tag`
4. 上記いずれにも当てはまらない場合、`ITER_CONCEPT(I)`は型名を示さない

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>

template<std::input_iterator I>
void f(const char* name) {
  std::cout << name << " is input_iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not input_iterator" << std::endl;
}


struct sample_input_iterator {
  // *thisの参照を返さなければならない（戻り値型は自身の参照型）
  friend auto operator++(sample_input_iterator&) -> sample_input_iterator&;
  // 戻り値型はvoidでも可
  friend auto operator++(sample_input_iterator&, int) -> sample_input_iterator;

  // const修飾されていなければならない
  // indirectly_readableコンセプトにおいて、iter_reference_tの結果がconst有無両方で一致することが求められる
  friend auto operator*(const sample_input_iterator&) -> int&;

  // 少なくともこの3つは必須
  using difference_type = int;
  using value_type = int;
  using iterator_concept = std::input_iterator_tag;
};


int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<std::istream_iterator<double>>("std::istream_iterator<double>");
  f<sample_input_iterator>("sample_input_iterator");
  
  std::cout << "\n";
  f<int* const>("int* const");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
}
```
* std::input_iterator[color ff0000]

### 出力
```
int* is input_iterator
const int* is input_iterator
std::vector<int>::iterator is input_iterator
std::istream_iterator<double> is input_iterator
sample_input_iterator is input_iterator

int* const is not input_iterator
std::ostream_iterator<double> is not input_iterator
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
