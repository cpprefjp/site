# input_or_output_iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept input_or_output_iterator =
    requires(I i) {
      { *i } -> can-reference;
    } &&
    weakly_incrementable<I>;
}
```
* can-reference[link /reference/iterator/dereferenceable.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]

## 概要

`input_or_output_iterator`は、イテレータ型`I`が[`weakly_incrementable`](weakly_incrementable.md)であり、間接参照が何らかの結果を返すことを表すコンセプトである。

`input_or_output_iterator`はイテレータコンセプトの基礎となるコンセプトであり、イテレータに対する最小の要件である。全てのイテレータは本コンセプトのモデルとならなければならない。

## 備考

名前に`input_or_output`とあるがこれはイテレータ分類としてのそれらの共通部分のような意味であり、このコンセプトはイテレータを介した入出力やイテレータのコピー、イテレータの比較についてを何ら制約しない。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>

template<std::input_or_output_iterator I>
void f(const char* name) {
  std::cout << name << " is input_or_output_iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not input_or_output_iterator" << std::endl;
}


struct sample_input_or_output_iterator {
  friend auto operator++(sample_input_or_output_iterator&) -> sample_input_or_output_iterator&;
  friend auto operator++(sample_input_or_output_iterator&, int) -> sample_input_or_output_iterator;

  friend auto operator*(sample_input_or_output_iterator&) -> int;

  using difference_type = int;
};

struct sample_weak_incrementable {
  friend auto operator++(sample_weak_incrementable&) -> sample_weak_incrementable&;
  friend auto operator++(sample_weak_incrementable&, int) -> sample_weak_incrementable&;  

  using difference_type = int;
};


int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
  f<sample_input_or_output_iterator>("sample_input_or_output_iterator");

  std::cout << "\n";
  f<int* const>("int* const");
  f<sample_weak_incrementable>("sample_weak_incrementable");
}
```
* std::input_or_output_iterator[color ff0000]

### 出力
```
int* is input_or_output_iterator
const int* is input_or_output_iterator
std::vector<int>::iterator is input_or_output_iterator
std::ostream_iterator<double> is input_or_output_iterator
sample_input_or_output_iterator is input_or_output_iterator

int* const is not input_or_output_iterator
sample_weak_incrementable is not input_or_output_iterator
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
- [P1207R4 Movability of single-pass iterators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1207r4.pdf)
