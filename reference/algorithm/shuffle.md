#shuffle
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]


```cpp
namespace std {
  template <class RandomAccessIterator, class UniformRandomNumberGenerator>
  void shuffle(RandomAccessIterator first, RandomAccessIterator last,
               UniformRandomNumberGenerator&& g);
}
```

##概要
`[first,last)` のそれぞれの要素を同じ確率で並び替える。


##要件
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。
- `UniformRandomNumberGenerator` は uniform random number generator の要件を満たさなければならず、その戻り値の型は [`iterator_traits`](/reference/iterator/iterator_traits.md)`<RandomAccessIterator>::difference_type` へ変換可能でなければならない。


##計算量
正確に `(last - first) - 1` 回 swap する。


##備考
以下の実装では、[フィッシャー - イェーツのシャッフル](https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A3%E3%83%83%E3%82%B7%E3%83%A3%E3%83%BC_-_%E3%82%A4%E3%82%A7%E3%83%BC%E3%83%84%E3%81%AE%E3%82%B7%E3%83%A3%E3%83%83%E3%83%95%E3%83%AB)アルゴリズムが使用されている：

- GCC 4.9 (libstdc++)
- Clang 3.4 (libc++)
- Visual C++ 12.0


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <numeric>
#include <iterator>
#include <random>

int main() {
  std::vector<int> v(10);
  std::iota(v.begin(), v.end(), 0); // 0～9 までの値を生成

  std::cout << "before: ";
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout));
  std::cout << std::endl;

  // シャッフル
  std::shuffle(v.begin(), v.end(), std::mt19937());

  std::cout << " after: ";
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout));
  std::cout << std::endl;
}
```
* std::shuffle[color ff0000]
* std::iota[link /reference/numeric/iota.md]
* std::copy[link copy.md]
* std::ostream_iterator[link /reference/iterator/ostream_iterator.md]
* std::mt19937[link /reference/random/mt19937.md]

###出力
```
before: 0123456789
 after: 5803429716
```

##実装例
```cpp
template <class RandomAccessIterator, class UniformRandomNumberGenerator>
void shuffle(RandomAccessIterator first, RandomAccessIterator last, UniformRandomNumberGenerator&& g) {
  if (first == last) return;

  typedef typename iterator_traits<RandomAccessIterator>::difference_type distance_type;
  typedef typename make_unsigned<distance_type>::type                     unsigned_type;
  typedef typename uniform_int_distribution<unsigned_type>                distribute_type;
  typedef typename distribute_type::param_type                            param_type;

  distribute_type d;
  for (auto it = first + 1; it != last; ++it)
    iter_swap(it, first + d(g, param_type(0, it - first)));
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]
* make_unsigned[link /reference/type_traits/make_unsigned.md]
* uniform_int_distribution[link /reference/random/uniform_int_distribution.md]
* iter_swap[link iter_swap.md]

