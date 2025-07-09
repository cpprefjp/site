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
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* sortable[link /reference/iterator/sortable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]


## 概要
範囲を部分的にソートし、先頭 `N` 個を順に並んだ状態にする。`N` は `middle - first` で決まる。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

この関数は、「売り上げランキング トップ1位から10位まで」のように、全体ではなく最高順位から途中までの順位がわかればよい状況で、全体を並び替える[`sort()`](sort.md)関数の代わりに使用できる。

なお、トップ10がどれかわかれば十分である（1位から10位までは順不同でよい）ような場合、[`nth_element()`](nth_element.md)が使用できる。

## 効果
`[first,last)` にある要素の中から、`middle - first` 個の要素をソート済みの状態で `[first,middle)` に配置する。残りの `[middle,last)` にある要素は unspecified order に配置される。


## 戻り値
`last`

## 計算量
ほぼ `(last - first) * log(middle - first)` 回の比較を行う


## 例
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
