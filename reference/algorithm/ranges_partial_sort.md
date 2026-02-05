# partial_sort
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <random_access_iterator I,
            sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  constexpr I
    partial_sort(I first,
                 I middle,
                 S last,
                 Comp comp = {},
                 Proj proj = {}); // (1) C++20

  template <random_access_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr borrowed_iterator_t<R>
    partial_sort(R&& r,
                 iterator_t<R> middle,
                 Comp comp = {},
                 Proj proj = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  I partial_sort(Ep&& exec,
                 I first,
                 I middle,
                 S last,
                 Comp comp = {},
                 Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  borrowed_iterator_t<R>
    partial_sort(Ep&& exec,
                 R&& r,
                 iterator_t<R> middle,
                 Comp comp = {},
                 Proj proj = {}); // (4) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* sortable[link /reference/iterator/sortable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]


## 概要
範囲を部分的にソートし、先頭 `N` 個を順に並んだ状態にする。`N` は `middle - first` で決まる。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

この関数は、「売り上げランキング トップ1位から10位まで」のように、全体ではなく最高順位から途中までの順位がわかればよい状況で、全体を並び替える[`sort()`](sort.md)関数の代わりに使用できる。

なお、トップ10がどれかわかれば十分である（1位から10位までは順不同でよい）ような場合、[`nth_element()`](nth_element.md)が使用できる。

## 効果
`[first,last)` にある要素の中から、`middle - first` 個の要素をソート済みの状態で `[first,middle)` に配置する。残りの `[middle,last)` にある要素は unspecified order に配置される。


## 戻り値
`last`

## 計算量
ほぼ `(last - first) * log(middle - first)` 回の比較を行う


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // 先頭2要素を並んだ状態にする
  std::ranges::partial_sort(v, v.begin() + 2);

  for (int i : v) {
    std::cout << i;
  }
  std::cout << std::endl;
}
```
* std::ranges::partial_sort[color ff0000]

### 出力
```
12435
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};

  // 並列に先頭3要素を並んだ状態にする
  std::ranges::partial_sort(std::execution::par, v, v.begin() + 3);

  for (int i : v) {
    std::cout << i << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::partial_sort[color ff0000]
* v.begin()[link /reference/vector/vector/begin.md]

#### 出力例
```
1 1 2 4 5 9 3 6 5 3 5
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
