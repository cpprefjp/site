# indirectly_unary_invocable/indirectly_regular_unary_invocable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class F, class I>
  concept indirectly_unary_invocable =
    indirectly_readable<I> &&
    copy_constructible<F> &&
    invocable<F&, iter_value_t<I>&> &&
    invocable<F&, iter_reference_t<I>> &&
    invocable<F&, iter_common_reference_t<I>> &&
    common_reference_with<
      invoke_result_t<F&, iter_value_t<I>&>,
      invoke_result_t<F&, iter_reference_t<I>>>;  // C++20

  template<class F, class I>
  concept indirectly_unary_invocable =
    indirectly_readable<I> &&
    copy_constructible<F> &&
    invocable<F&, iter_value_t<I>&> &&
    invocable<F&, iter_reference_t<I>> &&
    common_reference_with<
      invoke_result_t<F&, iter_value_t<I>&>,
      invoke_result_t<F&, iter_reference_t<I>>>;  // C++26

  template<class F, class I>
  concept indirectly_regular_unary_invocable =
    indirectly_readable<I> &&
    copy_constructible<F> &&
    regular_invocable<F&, iter_value_t<I>&> &&
    regular_invocable<F&, iter_reference_t<I>> &&
    regular_invocable<F&, iter_common_reference_t<I>> &&
    common_reference_with<
      invoke_result_t<F&, iter_value_t<I>&>,
      invoke_result_t<F&, iter_reference_t<I>>>;  // C++20

  template<class F, class I>
  concept indirectly_regular_unary_invocable =
    indirectly_readable<I> &&
    copy_constructible<F> &&
    regular_invocable<F&, iter_value_t<I>&> &&
    regular_invocable<F&, iter_reference_t<I>> &&
    common_reference_with<
      invoke_result_t<F&, iter_value_t<I>&>,
      invoke_result_t<F&, iter_reference_t<I>>>;  // C++26
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* copy_constructible[link /reference/concepts/copy_constructible.md]
* invocable[link /reference/concepts/invocable.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* iter_common_reference_t[link /reference/iterator/iter_common_reference_t.md]
* common_reference_with[link /reference/concepts/common_reference_with.md]
* invoke_result_t[link /reference/type_traits/invoke_result.md]
* regular_invocable[link /reference/concepts/invocable.md]

## 概要

`indirectly_unary_invocable`及び`indirectly_regular_unary_invocable`は、間接参照可能な型`I`（例えばイテレータ型）の参照先の型によって、`F`が関数呼び出し可能であることを表すコンセプトである。

単純には、型`I, F`のオブジェクトをそれぞれ`i, f`とすると`f(*i)`のような呼び出しが可能であることを表している。

これは例えば、[`for_each`](/reference/algorithm/for_each.md)のようなイテレータを取るアルゴリズムにおいて、処理をカスタマイズする関数オブジェクトの制約に用いることができる。

## 備考

`indirectly_unary_invocable`と`indirectly_regular_unary_invocable`の違いは意味論的な要件のみである。`indirectly_regular_unary_invocable`はその呼び出しに[等しさの保持](/reference/concepts.md)を要求し、表明する。詳細は[`invocable/regular_invocable`](/reference/concepts/invocable.md)を参照のこと。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <memory>

template<typename I, std::indirectly_unary_invocable<I> F>
void f(const char* nameI, const char* nameF) {
  std::cout << nameI << " is indirectly_unary_invocable " << nameF << std::endl;
}

template<typename I, typename F>
void f(const char* nameI, const char* nameF) {
  std::cout << nameI << " is not indirectly_unary_invocable " << nameF << std::endl;
}

using F1 = decltype([](const int&) -> int { return 0; });
using F2 = decltype([](int&&) -> int { return 0; });

int main() {
  f<int*, F1>("int*", "int(const int&)");
  f<std::unique_ptr<int>, F1>("std::unique_ptr<int>", "int(const int&)");
  f<std::vector<int>::iterator, F1>("std::vector<int>::iterator", "int(const int&)");
  f<std::istream_iterator<int>, F1>("std::istream_iterator<int>", "int(const int&)");
    
  std::cout << "\n";

  f<int*, F2>("int*", "int(int&&)");
  f<std::unique_ptr<int>, F2>("std::unique_ptr<int>", "int(int&&)");
  f<std::vector<int>::iterator, F2>("std::vector<int>::iterator", "int(int&&)");
  f<std::istream_iterator<int>, F2>("std::istream_iterator<int>", "int(int&&)");
}
```
* std::indirectly_unary_invocable[color ff0000]

### 出力
```
int* is indirectly_unary_invocable int(const int&)
std::unique_ptr<int> is indirectly_unary_invocable int(const int&)
std::vector<int>::iterator is indirectly_unary_invocable int(const int&)
std::istream_iterator<int> is indirectly_unary_invocable int(const int&)

int* is not indirectly_unary_invocable int(int&&)
std::unique_ptr<int> is not indirectly_unary_invocable int(int&&)
std::vector<int>::iterator is not indirectly_unary_invocable int(int&&)
std::istream_iterator<int> is not indirectly_unary_invocable int(int&&)
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
