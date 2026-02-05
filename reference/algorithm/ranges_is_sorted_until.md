# is_sorted_until
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
  constexpr I
    is_sorted_until(I first,
                    S last,
                    Comp comp = {},
                    Proj proj = {}); // (1) C++20

  template <forward_range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  constexpr borrowed_iterator_t<R>
    is_sorted_until(R&& r,
                    Comp comp = {},
                    Proj proj = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
  I is_sorted_until(Ep&& exec,
                    I first,
                    S last,
                    Comp comp = {},
                    Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  borrowed_iterator_t<R>
    is_sorted_until(Ep&& exec,
                    R&& r,
                    Comp comp = {},
                    Proj proj = {}); // (4) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
ソート済みか判定し、ソートされていない位置のイテレータを取得する

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

## 戻り値
[`distance`](/reference/iterator/distance.md)`(first, last) < 2` なら `last` を返す。そうでない場合、`[first,last]` の中でソートされている範囲を `[first,i)` としたとき、そのイテレータ `i` を返す。


## 計算量
線形時間


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  std::cout << std::boolalpha;
  std::cout << "before: is sorted? "
            << (std::ranges::is_sorted_until(v) == v.end()) << std::endl;

  std::sort(v.begin(), v.end());

  std::cout << " after: is sorted? "
            << (std::ranges::is_sorted_until(v) == v.end()) << std::endl;
}
```
* std::ranges::is_sorted_until[color ff0000]

### 出力
```
before: is sorted? false
 after: is sorted? true
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {1, 2, 3, 5, 4, 6};

  // 並列にソート済み範囲の終端を取得する
  auto it = std::ranges::is_sorted_until(std::execution::par, v);

  std::cout << "sorted until: " << *it << std::endl;
  std::cout << "sorted range size: " << (it - v.begin()) << std::endl;
}
```
* std::ranges::is_sorted_until[color ff0000]
* v.begin()[link /reference/vector/vector/begin.md]

#### 出力
```
sorted until: 4
sorted range size: 4
```

## 実装例
```cpp

struct is_sorted_until_impl {
  template<forward_iterator I, sentinel_for<I> S, class Proj = identity,
           indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
  constexpr I operator()(I first, S last, Comp comp = {}, Proj proj = {}) {
    auto it = first;
    if (it == last || ++it == last)
      return last;
    while (it != last && *first < *it)
      ++first, ++it;
    return it;
  }

  template<forward_range R, class Proj = identity,
           indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  constexpr borrowed_iterator_t<R> operator()(R&& r, Comp comp = {}, Proj proj = {}) {
    return (*this)(begin(r), end(r), ref(comp), ref(proj));
  }
};

inline constexpr is_sorted_until_impl is_sorted_until;
```
* ranges::less[link /reference/functional/ranges_less.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* begin[link /reference/ranges/begin.md]
* end[link /reference/ranges/end.md]
* ref[link /reference/functional/ref.md]

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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
