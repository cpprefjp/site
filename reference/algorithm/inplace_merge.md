#inplace_merge
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class BidirectionalIterator>
  void inplace_merge(BidirectionalIterator first,
                     BidirectionalIterator middle,
                     BidirectionalIterator last);

  template <class BidirectionalIterator, class Compare>
  void inplace_merge(BidirectionalIterator first,
                     BidirectionalIterator middle,
                     BidirectionalIterator last,
                     Compare comp);
}
```

##概要
2つの連続したソート済み範囲をマージする。


##要件
- `[first,middle)` と `[middle,last)` の範囲はそれぞれ `operator<` か `comp` でソートされていること。
- `BidirectionalIterator` は `ValueSwappable` の要件を満たしていること。
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること。


##効果
`[first,middle)`, `[middle,last)` という、連続した２つの範囲をマージし、結果を `[first,last)` へ格納する。

結果の範囲 `[first,last)` は昇順になる。つまり、`first` を除く `[first,last)` 内の全てのイテレータ `i` について、`*i < *(i - 1)` または `comp(*i, *(i - 1))` が `false` になる。


##戻り値
なし


##計算量
余分なメモリを使用する場合は、`(last - first) - 1` 回比較する。

そうでない場合は、N log(N) （N は `last - first`）回程度比較するアルゴリズムになる。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1,4,5,  2,3,6};

  // ソートされた2つの範囲をマージ
  std::inplace_merge(v.begin(), v.begin() + 3, v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* inplace_merge[color ff0000]


###出力
```
1
2
3
4
5
6
```

##実装例
- [inplace_merge を読んでみた](http://www.kmonos.net/wlog/115.html#_2300101215)



