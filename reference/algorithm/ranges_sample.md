# sample
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]


```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O,
            class Gen>
    requires (forward_iterator<I> || random_access_iterator<O>) &&
             indirectly_copyable<I, O> &&
             uniform_random_bit_generator<remove_reference_t<Gen>>
  O
    sample(I first,
           S last,
           O out,
           iter_difference_t<I> n,
           Gen&& g); // (1) C++20

  template <input_range R,
            weakly_incrementable O,
            class Gen>
    requires (forward_range<R> || random_access_iterator<O>) &&
             indirectly_copyable<iterator_t<R>, O> &&
             uniform_random_bit_generator<remove_reference_t<Gen>>
  O
    sample(R&& r,
           O out,
           range_difference_t<R> n,
           Gen&& g); // (2) C++20
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* forward_iterator[link /reference/iterator/forward_iterator.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* uniform_random_bit_generator[link /reference/random/uniform_random_bit_generator.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要
範囲から指定された個数の要素をランダムに抽出する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 事前条件
- `out`は範囲`[first, last)`に含まれてはならない


## 効果
範囲`[first, last)`を母集団 (population) とし、そこから[`min`](min.md)`(last - first, n)`個の要素を標本 (sample) として `out` にコピーする (`n`が入力範囲の要素数より大きい場合は、最大で入力範囲の要素数がコピーされる)。


## 戻り値
出力範囲の最後のイテレータが返る


## 計算量
範囲`[first, last)`の要素数に対して線形時間


## 備考
このアルゴリズムの実装には、以下の2つのバージョンが使用される：

- 出力をランダムアクセスで行うバージョン : KnuthのAlgorithm R (Reservoir sampling)
- 出力を前から順番に行うバージョン : KnuthのAlgorithm S (Selection sampling)

これらのアルゴリズムは、イテレータカテゴリによって、コンパイル時に自動的に選択されることになる。


## 例
```cpp example
#include <iostream>
#include <string>
#include <iterator>
#include <random>
#include <algorithm>

int main()
{
  // 乱数生成器を用意する
  std::random_device seed_gen;
  std::mt19937 engine {seed_gen()};

  // 文字列中から3文字をランダム抽出する
  {
    const std::string input = "abcdef";
    const int n = 3;

    std::string result;
    std::ranges::sample(input, std::back_inserter(result), n, engine);
    std::cout << result << std::endl;
  }

  // 配列から3要素をランダム抽出する
  {
    const std::vector<int> input = {0, 1, 2, 3, 4, 5};
    const int n = 3;

    std::vector<int> result;
    std::ranges::sample(input, std::back_inserter(result), n, engine);

    for (int x : result) {
      std::cout << x;
    }
    std::cout << std::endl;
  }
}
```
* std::ranges::sample[color ff0000]

### 出力例
```
bcd
235
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
