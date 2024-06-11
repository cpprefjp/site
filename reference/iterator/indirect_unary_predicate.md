# indirect_unary_predicate
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class F, class I>
  concept indirect_unary_predicate =
    indirectly_readable<I> &&
    copy_constructible<F> &&
    predicate<F&, iter_value_t<I>&> &&
    predicate<F&, iter_reference_t<I>> &&
    predicate<F&, iter_common_reference_t<I>>;
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* copy_constructible[link /reference/concepts/copy_constructible.md]
* predicate[link /reference/concepts/predicate.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* iter_common_reference_t[link /reference/iterator/iter_common_reference_t.md]

## 概要

`indirect_unary_predicate`は、間接参照可能な型`I`（例えばイテレータ型）の参照先の型によって、`F`が単項述語（1引数の[`predicate`](/reference/concepts/predicate.md)）となることを表すコンセプトである。

単純には、型`I, F`のオブジェクトをそれぞれ`i, f`とすると`bool c = f(*i)`のような呼び出しが可能であることを表している。

これは例えば、[`find_if`](/reference/algorithm/find_if.md)のようなイテレータを取るアルゴリズムにおいて、条件判定をカスタマイズする述語オブジェクトの制約に用いることができる。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <memory>

template<typename I, std::indirect_unary_predicate<I> F>
void f(const char* nameI, const char* nameF) {
  std::cout << nameI << " is indirect_unary_predicate " << nameF << std::endl;
}

template<typename I, typename F>
void f(const char* nameI, const char* nameF) {
  std::cout << nameI << " is not indirect_unary_predicate " << nameF << std::endl;
}

using F1 = decltype([](const int&) -> bool { return true; });
using F2 = decltype([](const int&) -> void { });

int main() {
  f<int*, F1>("int*", "bool(const int&)");
  f<std::unique_ptr<int>, F1>("std::unique_ptr<int>", "bool(const int&)");
  f<std::vector<int>::iterator, F1>("std::vector<int>::iterator", "bool(const int&)");
  f<std::istream_iterator<int>, F1>("std::istream_iterator<int>", "bool(const int&)");
    
  std::cout << "\n";

  f<int*, F2>("int*", "void(const int&)");
  f<std::unique_ptr<int>, F2>("std::unique_ptr<int>", "void(const int&)");
  f<std::vector<int>::iterator, F2>("std::vector<int>::iterator", "void(const int&)");
  f<std::istream_iterator<int>, F2>("std::istream_iterator<int>", "void(const int&)");
}
```
* std::indirect_unary_predicate[color ff0000]

### 出力
```
int* is indirect_unary_predicate bool(const int&)
std::unique_ptr<int> is indirect_unary_predicate bool(const int&)
std::vector<int>::iterator is indirect_unary_predicate bool(const int&)
std::istream_iterator<int> is indirect_unary_predicate bool(const int&)

int* is not indirect_unary_predicate void(const int&)
std::unique_ptr<int> is not indirect_unary_predicate void(const int&)
std::vector<int>::iterator is not indirect_unary_predicate void(const int&)
std::istream_iterator<int> is not indirect_unary_predicate void(const int&)
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
