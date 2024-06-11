# shuffle
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <random_access_iterator I,
            sentinel_for<I> S,
            class Gen>
    requires permutable<I> &&
             uniform_random_bit_generator<remove_reference_t<Gen>>
  I
    shuffle(I first,
            S last,
            Gen&& g); // (1) C++20

  template <random_access_range R,
            class Gen>
    requires permutable<iterator_t<R>> &&
             uniform_random_bit_generator<remove_reference_t<Gen>>
  borrowed_iterator_t<R>
    shuffle(R&& r,
            Gen&& g); // (2) C++20
}
```
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* permutable[link /reference/iterator/permutable.md]
* uniform_random_bit_generator[link /reference/random/uniform_random_bit_generator.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* random_access_range[link /reference/ranges/random_access_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]


## 概要
範囲のそれぞれの要素を同じ確率で並び替える。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


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

int main() {
  std::vector<int> v(10);
  std::iota(v.begin(), v.end(), 0); // 0～9 までの値を生成

  std::cout << "before: ";
  std::ranges::copy(v, std::ostream_iterator<int>(std::cout));
  std::cout << std::endl;

  // シャッフル
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());
  std::ranges::shuffle(v, engine);

  std::cout << " after: ";
  std::ranges::copy(v, std::ostream_iterator<int>(std::cout));
  std::cout << std::endl;
}
```
* std::ranges::shuffle[color ff0000]
* std::ranges::copy[link ranges_copy.md]

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

int main() {
  std::string input = "0123456789abcdef";

  std::cout << "before: " << input << std::endl;

  // シャッフル
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());
  std::ranges::shuffle(input, engine);

  std::cout << " after: " << input << std::endl;
}
```
* std::ranges::shuffle[color ff0000]

#### 出力例
```
before: 0123456789abcdef
 after: 49e351b8f0ad62c7
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
