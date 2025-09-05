# bidirectional_iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept bidirectional_iterator =
    forward_iterator<I> &&
    derived_from<ITER_CONCEPT(I), bidirectional_iterator_tag> &&
    requires(I i) {
      { --i } -> same_as<I&>;
      { i-- } -> same_as<I>;
    };
}
```
* derived_from[link /reference/concepts/derived_from.md]
* ITER_CONCEPT[link /reference/iterator/input_iterator.md#iter_concept]
* bidirectional_iterator_tag[link iterator_tag.md]

## 概要

`bidirectional_iterator`は、イテレータ型`I`が双方向イテレータであることを表すコンセプトである。

`bidirectional_iterator`となるイテレータは、[前方向イテレータ](forward_iterator.md)であり、後方にも進むことのできるイテレータである。

## 要件

ある`bidirectional_iterator`を`r`とすると、`r`は`++q == r`となるようなイテレータ`q`が存在する場合にのみデクリメント（`--`）可能である。そのようなデクリメント可能なイテレータは、`--r`と`r--`（デクリメント演算子）の[定義域](/reference/concepts.md)にある。

## モデル

型`I`の等しい2つのオブジェクト（同じ要素を指すイテレータ）`a, b`について次の条件を満たす場合に限って、型`I`は`bidirectional_iterator`のモデルである。

- `a, b`がデクリメント可能ならば、次の4つの条件を全て満たす
    - [`addressof`](/reference/memory/addressof.md)`(--a) ==` [`addressof`](/reference/memory/addressof.md)`(a)`
    - `bool(a-- == b)`
    - `a--, --b`の評価の後でも、`bool(a == b)`は`true`となる
    - `bool(++(--a) == b)`
- `a, b`がインクリメント可能ならば、`bool(--(++a) == b)`

## 例
```cpp example

#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <forward_list>
#include <list>

template<std::bidirectional_iterator I>
void f(const char* name) {
  std::cout << name << " is bidirectional_iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not bidirectional_iterator" << std::endl;
}

struct sample_bidirectional_iterator {
  friend auto operator++(sample_bidirectional_iterator&) -> sample_bidirectional_iterator&;
  friend auto operator++(sample_bidirectional_iterator&, int) -> sample_bidirectional_iterator;

  friend auto operator--(sample_bidirectional_iterator&) -> sample_bidirectional_iterator&;
  friend auto operator--(sample_bidirectional_iterator&, int) -> sample_bidirectional_iterator;

  friend auto operator*(const sample_bidirectional_iterator&) -> int&;

  friend bool operator==(const sample_bidirectional_iterator&, const sample_bidirectional_iterator&);

  using difference_type = int;
  using value_type = int;
  using iterator_concept = std::bidirectional_iterator_tag;
};


int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::list<int>::iterator>("std::list<int>::iterator");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<sample_bidirectional_iterator>("sample_bidirectional_iterator");
  
  std::cout << "\n";
  f<int* const>("int* const");
  f<std::forward_list<int>::iterator>("std::forward_list<int>::iterator");
  f<std::istream_iterator<double>>("std::istream_iterator<double>");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
}
```
* std::bidirectional_iterator[color ff0000]
* std::istream_iterator[link istream_iterator.md]

### 出力
```
int* is bidirectional_iterator
const int* is bidirectional_iterator
std::list<int>::iterator is bidirectional_iterator
std::vector<int>::iterator is bidirectional_iterator
sample_bidirectional_iterator is bidirectional_iterator

int* const is not bidirectional_iterator
std::forward_list<int>::iterator is not bidirectional_iterator
std::istream_iterator<double> is not bidirectional_iterator
std::ostream_iterator<double> is not bidirectional_iterator
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
