# random_access_iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept random_access_iterator =
    bidirectional_iterator<I> &&
    derived_from<ITER_CONCEPT(I), random_access_iterator_tag> &&
    totally_ordered<I> &&
    sized_sentinel_for<I, I> &&
    requires(I i, const I j, const iter_difference_t<I> n) {
      { i += n } -> same_as<I&>;
      { j +  n } -> same_as<I>;
      { n +  j } -> same_as<I>;
      { i -= n } -> same_as<I&>;
      { j -  n } -> same_as<I>;
      {  j[n]  } -> same_as<iter_reference_t<I>>;
    };
}
```
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* derived_from[link /reference/concepts/derived_from.md]
* ITER_CONCEPT[link /reference/iterator/input_iterator.md#iter_concept]
* random_access_iterator_tag[link /reference/iterator/iterator_tag.md]
* totally_ordered[link /reference/concepts/totally_ordered.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 概要

`random_access_iterator`は、イテレータ型`I`がランダムアクセスイテレータであることを表すコンセプトである。

`random_access_iterator`となるイテレータは、[双方向イテレータ](bidirectional_iterator.md)であり、`+= + -= -`による定数時間での進行と、`-`による定数時間での距離の計算が可能である。

## モデル

[`iter_difference_t<I>`](/reference/iterator/iter_difference_t.md)の示す型`D`、`D`の値`n`、型`I`の有効なイテレータ`a`と`++a`を`n`回適用したイテレータ`b`について次の条件を満たす場合に限って、型`I`は`random_access_iterator`のモデルである。

- `(a += n)`は`b`と等値（*equal*）
- `addressof(a += n)`は`addressof(a)`と等値
    - `+=`は`*this`を返す
- `(a + n)`は`(a += n)`と等値
- `D`の2つの正の値`x, y`について`(a + D(x + y))`が有効ならば、`(a + D(x + y))`は`((a + x) + y)`と等値
    - 結合則
- `(a + D(0))`は`a`と等値
- `(a + D(n - 1))`が有効ならば、`(a + n) `は`[](I c){ return ++c; }(a + D(n - 1))`と等値
- `(b += D(-n))`は`a`と等値
- `(b -= n)`は`a`と等値
- `addressof(b -= n)`は`addressof(b)`と等値
    - `-=`は`*this`を返す
- `(b - n)`は`(b -= n)`と等値
- `b`が間接参照可能ならば、`a[n]`は有効であり`*b`と等値
- `bool(a <= b) == true`

## 例
```cpp example

#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <forward_list>
#include <list>

template<std::random_access_iterator I>
void f(const char* name) {
  std::cout << name << " is random_access_iterator" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not random_access_iterator" << std::endl;
}

struct sample_random_access_iterator {
  friend auto operator++(sample_random_access_iterator&) -> sample_random_access_iterator&;
  friend auto operator++(sample_random_access_iterator&, int) -> sample_random_access_iterator;

  friend auto operator--(sample_random_access_iterator&) -> sample_random_access_iterator&;
  friend auto operator--(sample_random_access_iterator&, int) -> sample_random_access_iterator;
  
  friend auto operator+(const sample_random_access_iterator&, int) -> sample_random_access_iterator;
  friend auto operator+(int, const sample_random_access_iterator&) -> sample_random_access_iterator;
  friend auto operator+=(sample_random_access_iterator&, int) -> sample_random_access_iterator&;
  friend auto operator-(const sample_random_access_iterator&, int) -> sample_random_access_iterator;
  friend auto operator-=(sample_random_access_iterator&, int) -> sample_random_access_iterator&;
  
  friend auto operator-(const sample_random_access_iterator&, const sample_random_access_iterator&) -> int;

  friend auto operator*(const sample_random_access_iterator&) -> int&;
  auto operator[](int) const -> int&;

  friend std::strong_ordering operator<=>(const sample_random_access_iterator&, const sample_random_access_iterator&);
  friend bool operator==(const sample_random_access_iterator&, const sample_random_access_iterator&);

  using difference_type = int;
  using value_type = int;
  using iterator_category = std::random_access_iterator_tag;
};


int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<sample_random_access_iterator>("sample_random_access_iterator");
  
  std::cout << "\n";
  f<int* const>("int* const");
  f<std::forward_list<int>::iterator>("std::forward_list<int>::iterator");
  f<std::list<int>::iterator>("std::list<int>::iterator");
  f<std::istream_iterator<double>>("std::istream_iterator<double>");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
}
```
* std::random_access_iterator[color ff0000]

### 出力
```
int* is random_access_iterator
const int* is random_access_iterator
std::vector<int>::iterator is random_access_iterator
sample_random_access_iterator is random_access_iterator

int* const is not random_access_iterator
std::forward_list<int>::iterator is not random_access_iterator
std::list<int>::iterator is not random_access_iterator
std::istream_iterator<double> is not random_access_iterator
std::ostream_iterator<double> is not random_access_iterator
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
- [LWG Issue 3277. Pre-increment on prvalues is not a requirement of `weakly_incrementable`](https://wg21.cmeerw.net/lwg/issue3277)
