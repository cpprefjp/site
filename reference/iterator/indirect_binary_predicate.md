# indirect_binary_predicate
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class F, class I1, class I2>
  concept indirect_binary_predicate =
    indirectly_readable<I1> && indirectly_readable<I2> &&
    copy_constructible<F> &&
    predicate<F&, iter_value_t<I1>&, iter_value_t<I2>&> &&
    predicate<F&, iter_value_t<I1>&, iter_reference_t<I2>> &&
    predicate<F&, iter_reference_t<I1>, iter_value_t<I2>&> &&
    predicate<F&, iter_reference_t<I1>, iter_reference_t<I2>> &&
    predicate<F&, iter_common_reference_t<I1>, iter_common_reference_t<I2>>;  // C++20

  template<class F, class I1, class I2>
  concept indirect_binary_predicate =
    indirectly_readable<I1> && indirectly_readable<I2> &&
    copy_constructible<F> &&
    predicate<F&, iter_value_t<I1>&, iter_value_t<I2>&> &&
    predicate<F&, iter_value_t<I1>&, iter_reference_t<I2>> &&
    predicate<F&, iter_reference_t<I1>, iter_value_t<I2>&> &&
    predicate<F&, iter_reference_t<I1>, iter_reference_t<I2>>;  // C++26
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* copy_constructible[link /reference/concepts/copy_constructible.md]
* predicate[link /reference/concepts/predicate.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* iter_common_reference_t[link /reference/iterator/iter_common_reference_t.md]

## 概要

`indirect_binary_predicate`は、間接参照可能な型`I1, I2`（例えばイテレータ型）の参照先の型によって、`F`が二項述語（2引数の[`predicate`](/reference/concepts/predicate.md)）となることを表すコンセプトである。

単純には、型`I1, I2, F`のオブジェクトをそれぞれ`i1, i2, f`とすると`bool c = f(*i1, *i2)`のような呼び出しが可能であることを表している。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <memory>

template<typename I1, typename I2, std::indirect_binary_predicate<I1, I2> F>
void f(const char* nameI1, const char* nameI2, const char* nameF) {
  std::cout << nameI1 << " and " << nameI2 << " is indirect_binary_predicate " << nameF << std::endl;
}

template<typename I1, typename I2, typename F>
void f(const char* nameI1, const char* nameI2, const char* nameF) {
  std::cout << nameI1 << " and " << nameI2 << " is not indirect_binary_predicate " << nameF << std::endl;
}

using F1 = decltype([](const int&, double&) -> bool { return true; });
using F2 = decltype([](const int&, double&) -> void { });

int main() {
  f<int*, double*, F1>("int*", "double*", "int(const int&, double&)");
  f<std::unique_ptr<int>, double*, F1>("std::unique_ptr<int>", "double*", "int(const int&, double&)");
  f<std::vector<int>::iterator, double*, F1>("std::vector<int>::iterator", "double*", "int(const int&, double&)");
  f<std::istream_iterator<int>, double*, F1>("std::istream_iterator<int>", "double*", "int(const int&, double&)");
    
  std::cout << "\n";

  f<int*, double*, F2>("int*", "double*", "int(const int&, double&)");
  f<std::unique_ptr<int>, double*, F2>("std::unique_ptr<int>", "double*", "int(const int&, double&)");
  f<std::vector<int>::iterator, double*, F2>("std::vector<int>::iterator", "double*", "int(const int&, double&)");
  f<std::istream_iterator<int>, double*, F2>("std::istream_iterator<int>", "double*", "int(const int&, double&)");
}
```
* std::indirect_binary_predicate[color ff0000]

### 出力
```
int* and double* is indirect_binary_predicate int(const int&, double&)
std::unique_ptr<int> and double* is indirect_binary_predicate int(const int&, double&)
std::vector<int>::iterator and double* is indirect_binary_predicate int(const int&, double&)
std::istream_iterator<int> and double* is indirect_binary_predicate int(const int&, double&)

int* and double* is not indirect_binary_predicate int(const int&, double&)
std::unique_ptr<int> and double* is not indirect_binary_predicate int(const int&, double&)
std::vector<int>::iterator and double* is not indirect_binary_predicate int(const int&, double&)
std::istream_iterator<int> and double* is not indirect_binary_predicate int(const int&, double&)
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
- [P2997R1 Removing the common reference requirement from the indirectly invocable concepts](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2997r1.html)
    - C++26でイテレータの共通参照要件を削除
