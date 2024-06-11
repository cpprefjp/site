# indirect_strict_weak_order
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class F, class I1, class I2 = I1>
  concept indirect_strict_weak_order =
    indirectly_readable<I1> && indirectly_readable<I2> &&
    copy_constructible<F> &&
    strict_weak_order<F&, iter_value_t<I1>&, iter_value_t<I2>&> &&
    strict_weak_order<F&, iter_value_t<I1>&, iter_reference_t<I2>> &&
    strict_weak_order<F&, iter_reference_t<I1>, iter_value_t<I2>&> &&
    strict_weak_order<F&, iter_reference_t<I1>, iter_reference_t<I2>> &&
    strict_weak_order<F&, iter_common_reference_t<I1>, iter_common_reference_t<I2>>;
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* copy_constructible[link /reference/concepts/copy_constructible.md]
* strict_weak_order[link /reference/concepts/strict_weak_order.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* iter_common_reference_t[link /reference/iterator/iter_common_reference_t.md]

## 概要

`indirect_strict_weak_order`は、間接参照可能な型`I1, I2`（例えばイテレータ型）の参照先の型によって、`F`が狭義の弱順序関係（[`equivalence_relation`](/reference/concepts/equivalence_relation.md)）となることを表すコンセプトである。

単純には、型`I1, I2, F`のオブジェクトをそれぞれ`i1, i2, f`とすると`bool c = f(*i1, *i2)`のような呼び出しが可能であり、結果`c`が狭義の弱順序を示すことを表している。

これは例えば、[`sort`](/reference/algorithm/sort.md)のようなイテレータを取るアルゴリズムにおいて、比較をカスタマイズする述語オブジェクトの制約に用いることができる。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <memory>

template<typename I, std::indirect_strict_weak_order<I> F>
void f(const char* nameI, const char* nameF) {
  std::cout << nameI << " is indirect_strict_weak_order " << nameF << std::endl;
}

template<typename I, typename F>
void f(const char* nameI, const char* nameF) {
  std::cout << nameI << " is not indirect_strict_weak_order " << nameF << std::endl;
}

using F1 = decltype([](const int& l, const int& r) -> bool { return l < r; });
using F2 = decltype([](const int&, const int&) -> void { });

int main() {
  f<int*, F1>("int*", "bool(const int&, const int&)");
  f<std::unique_ptr<int>, F1>("std::unique_ptr<int>", "bool(const int&, const int&)");
  f<std::vector<int>::iterator, F1>("std::vector<int>::iterator", "bool(const int&, const int&)");
  f<std::istream_iterator<int>, F1>("std::istream_iterator<int>", "bool(const int&, const int&)");
    
  std::cout << "\n";

  f<int*, F2>("int*", "void(const int&, const int&)");
  f<std::unique_ptr<int>, F2>("std::unique_ptr<int>", "void(const int&, const int&)");
  f<std::vector<int>::iterator, F2>("std::vector<int>::iterator", "void(const int&, const int&)");
  f<std::istream_iterator<int>, F2>("std::istream_iterator<int>", "void(const int&, const int&)");
}
```
* std::indirect_strict_weak_order[color ff0000]

### 出力
```
int* is indirect_strict_weak_order bool(const int&, const int&)
std::unique_ptr<int> is indirect_strict_weak_order bool(const int&, const int&)
std::vector<int>::iterator is indirect_strict_weak_order bool(const int&, const int&)
std::istream_iterator<int> is indirect_strict_weak_order bool(const int&, const int&)

int* is not indirect_strict_weak_order void(const int&, const int&)
std::unique_ptr<int> is not indirect_strict_weak_order void(const int&, const int&)
std::vector<int>::iterator is not indirect_strict_weak_order void(const int&, const int&)
std::istream_iterator<int> is not indirect_strict_weak_order void(const int&, const int&)
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
