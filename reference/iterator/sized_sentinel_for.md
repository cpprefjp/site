# sized_sentinel_for
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class S, class I>
  concept sized_sentinel_for =
    sentinel_for<S, I> &&
    !disable_sized_sentinel_for<remove_cv_t<S>, remove_cv_t<I>> &&
    requires(const I& i, const S& s) {
      { s - i } -> same_as<iter_difference_t<I>>;
      { i - s } -> same_as<iter_difference_t<I>>;
    };
}
```
* sentinel_for[link /reference/iterator/sentinel_for.md]
* disable_sized_sentinel_for[link disable_sized_sentinel_for.md]
* remove_cv_t[link /reference/type_traits/remove_cv.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要

`sized_sentinel_for`は、任意のイテレータ型`I`とその番兵型`S`の間で`operator-`によって定数時間で距離が求められる事を表すコンセプトである。

## モデル

型`I, S`の値`i, s`とそれによって示される範囲`[i, s)`、`bool(i == s) == true`となるために必要な`++i`の最小の適用回数を`N`とする。それら`i, s, N`について次の条件を満たす場合に限って、型`I, S`は`sized_sentinel_for`のモデルである。

- `N`が`iter_difference_t<I>`で表現可能な場合、`s - i`は適格であり`N`と等値となる
- `-N`が`iter_difference_t<I>`で表現可能な場合、`i - s`は適格であり`-N`と等値となる

## 備考

イテレータ型`I, S`が本コンセプトを構文的には満たしているが意味論的な制約まで満たすことができない（モデルとならない）場合に、`sized_sentinel_for<S, I> == false`とするためには[`disable_sized_sentinel_for`](disable_sized_sentinel_for.md)を`true`となるように特殊化する。

## 例

```cpp example
#include <iostream>
#include <iterator>
#include <vector>

template<typename I, std::sized_sentinel_for<I> S>
void f(const char* namei, const char* names) {
  std::cout << names << " is sized sentinel for " << namei << std::endl;
}

template<typename I, typename S>
void f(const char* namei, const char* names) {
  std::cout << names << " is not sized sentinel for " << namei << std::endl;
}


struct sample_sentinel{};

struct sample_sized_iterator {
  friend auto operator++(sample_sized_iterator&) -> sample_sized_iterator&;
  friend auto operator++(sample_sized_iterator&, int) -> sample_sized_iterator;

  friend auto operator*(sample_sized_iterator&) -> int;

  friend bool operator==(const sample_sized_iterator&, sample_sentinel);

  // input_or_output_iteratorに加えて、この2つを定義すればsized_sentinel_forとなる
  friend auto operator-(const sample_sized_iterator&, sample_sentinel) -> int;
  friend auto operator-(sample_sentinel, const sample_sized_iterator&) -> int;
  

  // std::default_sentinel_tは使用可能にしておく
  friend bool operator==(const sample_sized_iterator&, std::default_sentinel_t);
  friend auto operator-(const sample_sized_iterator&, std::default_sentinel_t) -> int;
  friend auto operator-(std::default_sentinel_t, const sample_sized_iterator&) -> int;

  using difference_type = int;
};

// disable_sized_sentinel_forをtrueで特殊化することでsized_sentinel_forを不適合にする
template<>
inline constexpr bool std::disable_sized_sentinel_for<sample_sentinel, sample_sized_iterator> = true;


int main() {
  f<int*, int*>("int*", "int*");
  f<const int*, int*>("const int*", "int*");
  f<int*, const int*>("int*", "int* const");
  f<std::vector<int>::iterator, std::vector<int>::iterator>("std::vector<int>::iterator", "std::vector<int>::iterator");
  f<sample_sized_iterator, std::default_sentinel_t>("sample_sized_iterator", "std::default_sentinel");

  std::cout << "\n";
  f<std::vector<int>::iterator, int*>("std::vector<int>::iterator", "int*");
  f<double*, int*>("double*", "int*");
  f<sample_sized_iterator, sample_sentinel>("sample_sized_iterator", "sample_sentinel");
}
```
* std::sized_sentinel_for[color ff0000]

### 出力
```
int* is sized sentinel for int*
int* is sized sentinel for const int*
int* const is sized sentinel for int*
std::vector<int>::iterator is sized sentinel for std::vector<int>::iterator
std::default_sentinel is sized sentinel for sample_sized_iterator

int* is not sized sentinel for std::vector<int>::iterator
int* is not sized sentinel for double*
sample_sentinel is not sized sentinel for sample_sized_iterator
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
