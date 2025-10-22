# shuffle
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]


```cpp
namespace std {
  template <class RandomAccessIterator, class UniformRandomBitGenerator>
  void shuffle(RandomAccessIterator first, RandomAccessIterator last,
               UniformRandomBitGenerator&& g);
}
```

## 概要
`[first,last)` のそれぞれの要素を同じ確率で並び替える。


## 要件
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。
- `UniformRandomBitGenerator` は uniform random bit generator の要件を満たさなければならず、その戻り値の型は [`iterator_traits`](/reference/iterator/iterator_traits.md)`<RandomAccessIterator>::difference_type` へ変換可能でなければならない。


## 計算量
正確に `(last - first) - 1` 回 swap する。


## 備考
以下の実装では、[フィッシャー - イェーツのシャッフル](https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A3%E3%83%83%E3%82%B7%E3%83%A3%E3%83%BC_-_%E3%82%A4%E3%82%A7%E3%83%BC%E3%83%84%E3%81%AE%E3%82%B7%E3%83%A3%E3%83%83%E3%83%95%E3%83%AB)アルゴリズムが使用されている：

- GCC: 4.9 (libstdc++)
- Clang: 3.4 (libc++)
- Visual C++: 2013


## 例
### 整数の配列をシャッフルする
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <numeric>
#include <iterator>
#include <random>
#include <cstdint>

int main() {
  std::vector<int> v(10);
  std::iota(v.begin(), v.end(), 0); // 0～9 までの値を生成

  std::cout << "before: ";
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout));
  std::cout << std::endl;

  // シャッフル
  std::random_device seed_gen;
  std::uint32_t seed = seed_gen();
  std::mt19937 engine(seed);
  std::shuffle(v.begin(), v.end(), engine);

  std::cout << " after: ";
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout));
  std::cout << std::endl;
}
```
* std::shuffle[color ff0000]

#### 出力例
```
before: 0123456789
 after: 5803429716
```

### 文字列をシャッフルする
```cpp example
#include <algorithm>
#include <iostream>
#include <string>
#include <random>
#include <cstdint>

int main() {
  std::string input = "0123456789abcdef";

  std::cout << "before: " << input << std::endl;

  // シャッフル
  std::random_device seed_gen;
  std::uint32_t seed = seed_gen();
  std::mt19937 engine(seed);
  std::shuffle(input.begin(), input.end(), engine);

  std::cout << " after: " << input << std::endl;
}
```
* std::shuffle[color ff0000]
* input.begin()[link /reference/string/basic_string/begin.md]
* input.end()[link /reference/string/basic_string/end.md]

#### 出力例
```
before: 0123456789abcdef
 after: 49e351b8f0ad62c7
```

## 実装例
```cpp
template <class RandomAccessIterator, class UniformRandomBitGenerator>
void shuffle(RandomAccessIterator first, RandomAccessIterator last, UniformRandomBitGenerator&& g) {
  if (first == last) return;

  using distance_type   = typename iterator_traits<RandomAccessIterator>::difference_type;
  using unsigned_type   = typename make_unsigned<distance_type>::type;
  using distribute_type = typename uniform_int_distribution<unsigned_type>;
  using param_type      = typename distribute_type::param_type;

  distribute_type d;
  for (auto it = first + 1; it != last; ++it)
    iter_swap(it, first + d(g, param_type(0, it - first)));
}
```
* make_unsigned[link /reference/type_traits/make_unsigned.md]
* uniform_int_distribution[link /reference/random/uniform_int_distribution.md]
* iter_swap[link iter_swap.md]


## 参照
- [P0346R1 A `<random>` Nomenclature Tweak](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0346r1.pdf)
    - URNGをURBGに変更
