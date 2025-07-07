# next_permutation
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class BidirectionalIterator>
  bool next_permutation(BidirectionalIterator first,
                        BidirectionalIterator last);           // (1) C++03

  template <class BidirectionalIterator>
  constexpr bool next_permutation(BidirectionalIterator first,
                                  BidirectionalIterator last); // (1) C++20

  template <class BidirectionalIterator, class Compare>
  bool next_permutation(BidirectionalIterator first,
                        BidirectionalIterator last,
                        Compare comp);                         // (2) C++03

  template <class BidirectionalIterator, class Compare>
  constexpr bool next_permutation(BidirectionalIterator first,
                                  BidirectionalIterator last,
                                  Compare comp);               // (2) C++20
}
```

## 概要
与えられた時点のイテレータ範囲`[first, last)`を起点の順列として、辞書順によるその次の順列を生成する。


## テンプレートパラメータ制約
`BidriectionalIterator`が`ValueSwappable`の要件を満たしていること。


## 効果
イテレータ範囲`[first, last)`の範囲を次の順列に変換する。

`operator<`または`comp`によって辞書順に並んでいる全ての順列の集合があると仮定すると、次の順列が発見される。

順列の辞書順とは、同じ長さ`N`の順列`a, b`があった時、その最上位の項から見た時に`ai != bi`となる最初の`i`番目の項について、`ai < bi`（もしくは`comp(ai, bi) == true`）となる時に`a < b`とするように定めた順序のことである。例えばこれは、各項（`ai, bi`）が`0 ~ 9`の数であるとすれば、それらをそのまま並べて構成した数の通常の大小関係に等しい。

辞書順による次の順列とは、現在の順列（`[first, last)`）よりも（上記の意味の順序で）大きい順列のうち取り得る最小のもののことである。


## 戻り値
次の順列が存在する場合は`true`を返し、そうでなければ`false`を返す。


## 計算量
高々`(last - first)/2`回の要素の交換


## 備考
- 全ての順列を取得したい場合は、この関数に最初に与えるイテレータ範囲が、昇順にソート済みになっていること
    - 順列の長さを`N`（`N = last - first`）とすれば、そのような順列は`N!`個存在する


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

void print(const std::vector<int>& v)
{
  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << " ";
  });
  std::cout << std::endl;
}

int main ()
{
  // 昇順にソート済みの入力
  std::vector<int> v = {1, 2, 3};

  do {
    print(v);
  } while (std::next_permutation(v.begin(), v.end()));
}
```
* std::next_permutation[color ff0000]

### 出力
```
1 2 3 
1 3 2 
2 1 3 
2 3 1 
3 1 2 
3 2 1 
```

## 実装例

```cpp
template <class BidirectionalIterator, class Compare>
bool next_permutation(BidirectionalIterator first, BidirectionalIterator last, Compare comp)
{
  if (first == last)
    return false;

  BidirectionalIterator i = first;
  ++i;

  if (i == last)
    return false;

  i = last;
  --i;

  for(;;) {
    BidirectionalIterator ii = i;
    --i;
    if (comp(*i, *ii)) {
      BidirectionalIterator j = last;
      while (!comp(*i, *--j)) {}

      std::swap(*i, *j);
      std::reverse(ii, last);
      return true;
    }
    if (i == first) {
      std::reverse(first, last);
      return false;
    }
  }
}

template <class BidirectionalIterator>
bool next_permutation(BidirectionalIterator first, BidirectionalIterator last)
{
  using value_type = typename std::iterator_traits<BidirectionalIterator>::value_type;

  return next_permutation(first, last, std::less<value_type>());
}
```
* std::swap[link /reference/utility/swap.md]
* std::iterator_traits[link /reference/iterator/iterator_traits.md]
* std::less[link /reference/functional/less.md]


## 関連項目
- [`std::prev_permutation()`](prev_permutation.md)


## 参照
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
