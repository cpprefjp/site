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

  template <bidirectional_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  borrowed_iterator_t<R>
    inplace_merge(R&& r,
                  iterator_t<R> middle,
                  Comp comp = {},
                  Proj proj = {}); // (2) C++20
}
```
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::less[link /reference/functional/ranges_less.md]
* identity[link /reference/functional/identity.md]
* sortable[link /reference/iterator/sortable.md]
* bidirectional_range[link /reference/ranges/bidirectional_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
2つの連続したソート済み範囲をマージする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

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

## 実装例
- [inplace_merge を読んでみた](http://www.kmonos.net/wlog/115.html#_2300101215)

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


