# inplace_merge
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <bidirectional_iterator I,
            sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  I
    inplace_merge(I first,
                  I middle,
                  S last,
                  Comp comp = {},
                  Proj proj = {}); // (1) C++20
  template <bidirectional_iterator I,
            sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  constexpr I
    inplace_merge(I first,
                  I middle,
                  S last,
                  Comp comp = {},
                  Proj proj = {}); // (1) C++26

  template <bidirectional_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  borrowed_iterator_t<R>
    inplace_merge(R&& r,
                  iterator_t<R> middle,
                  Comp comp = {},
                  Proj proj = {}); // (2) C++20
  template <bidirectional_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr borrowed_iterator_t<R>
    inplace_merge(R&& r,
                  iterator_t<R> middle,
                  Comp comp = {},
                  Proj proj = {}); // (2) C++26

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  I
    inplace_merge(Ep&& exec,
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
    inplace_merge(Ep&& exec,
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
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
2つの連続したソート済み範囲をマージする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

## 事前条件
- `[first,middle)` と `[middle,last)` の範囲はそれぞれソートされていること。


## 効果
`[first,middle)`, `[middle,last)` という、連続した２つの範囲をマージし、結果を `[first,last)` へ格納する。

結果の範囲 `[first,last)` は昇順になる。


## 戻り値
`last`


## 計算量
`N = last - first`であるとして説明する。

- 余分なメモリを使用する場合は、`N - 1` 回比較する。そうでない場合は、O(N log(N))回比較する

## 備考
この操作は安定である。つまり、各入力範囲内の要素の前後関係は保たれ、また、1 番目の範囲と 2 番目に等値の要素があった場合には、1 番目の範囲の要素の方が先に来る。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1,4,5,  2,3,6};

  // ソートされた2つの範囲をマージ
  std::ranges::inplace_merge(v, v.begin() + 3);

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```
* std::ranges::inplace_merge[color ff0000]

### 出力
```
1
2
3
4
5
6
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 3, 5, 2, 4, 6};

  // 並列にインプレースマージ
  // [1,3,5) と [2,4,6) をマージ
  std::ranges::inplace_merge(std::execution::par,
                             v, v.begin() + 3);

  for (int x : v) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::inplace_merge[color ff0000]

#### 出力
```
1 2 3 4 5 6
```

## 実装例
- [`inplace_merge` を読んでみた](http://www.kmonos.net/wlog/115.html#_2300101215)

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
- [P2562R1 `constexpr` Stable Sorting](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2562r1.pdf)
    - C++26から`constexpr`に対応した
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
