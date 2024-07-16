# forward_iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept forward_iterator =
    input_iterator<I> &&
    derived_from<ITER_CONCEPT(I), forward_iterator_tag> &&
    incrementable<I> &&
    sentinel_for<I, I>;
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* forward_iterator_tag[link /reference/iterator/iterator_tag.md]
* derived_from[link /reference/concepts/derived_from.md]
* ITER_CONCEPT[link /reference/iterator/input_iterator.md#iter_concept]
* incrementable[link /reference/iterator/incrementable.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]

## 概要

`forward_iterator`は、イテレータ型`I`が前方向イテレータであることを表すコンセプトである。

`forward_iterator`となるイテレータは、[入力イテレータ](input_iterator.md)であり、コピーと等値比較が可能になり、マルチパス保証があるイテレータである

## 要件

`forward_iterator`に対する`==`の[定義域](/reference/concepts.md)はそのイテレータが参照する範囲と同じ範囲を参照するイテレータ全体である。ただし、同じイテレータ型の間ではデフォルト構築（値初期化）されたイテレータとの比較が可能であり、そのようなデフォルト構築されたイテレータ同士の等値比較は常に`true`とならなければならない（それらのデフォルト構築されたイテレータは同じ空の範囲の終端を参照しているかのように振る舞う）。

範囲`[i, s)`を参照する`forward_iterator`から取得された、`[i, s)`への参照やポインタは、`[i, s)`が範囲として有効である限り有効であり続ける。

## マルチパス保証

間接参照可能なイテレータ型`X`とそのオブジェクト`a, b`について、次の条件を満たす場合に`X`はマルチパス保証を提供する

- `a == b`ならば`++a == ++b`
    - 同じ範囲を指すイテレータは、同じ範囲を同じ順番でイテレートする
- `((void)[](X x){++x;}(a), *a)`は`*a`と等しい
    - イテレータをコピーしてから何かをしても、元のイテレータに影響はない

この保証によって、前方向イテレータは一方向マルチパス（2回以上の走査）のアルゴリズムでの利用が可能になる。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>
#include <forward_list>
#include <list>

template<std::forward_iterator I>
void f(const char* name) {
  std::cout << name << " is forward_iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not forward_iterator" << std::endl;
}


struct sample_forward_iterator {
  friend auto operator++(sample_forward_iterator&) -> sample_forward_iterator&;
  friend auto operator++(sample_forward_iterator&, int) -> sample_forward_iterator;

  friend auto operator*(const sample_forward_iterator&) -> int&;

  friend bool operator==(const sample_forward_iterator&, const sample_forward_iterator&);

  using difference_type = int;
  using value_type = int;
  using iterator_concept = std::forward_iterator_tag;
};


int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::forward_list<int>::iterator>("std::forward_list<int>::iterator");
  f<std::list<int>::iterator>("std::list<int>::iterator");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<sample_forward_iterator>("sample_forward_iterator");

  std::cout << "\n";
  f<int* const>("int* const");
  f<std::istream_iterator<double>>("std::istream_iterator<double>");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
}
```
* std::forward_iterator[color ff0000]

### 出力
```
int* is forward_iterator
const int* is forward_iterator
std::forward_list<int>::iterator is forward_iterator
std::list<int>::iterator is forward_iterator
std::vector<int>::iterator is forward_iterator
sample_forward_iterator is forward_iterator

int* const is not forward_iterator
std::istream_iterator<double> is not forward_iterator
std::ostream_iterator<double> is not forward_iterator
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
