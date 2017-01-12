#prev_permutation
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class BidirectionalIterator>
  bool prev_permutation(BidirectionalIterator first,
                        BidirectionalIterator last);

  template <class BidirectionalIterator, class Compare>
  bool prev_permutation(BidirectionalIterator first,
                        BidirectionalIterator last, Compare comp);

}
```

##概要
前の順列を生成する。


##要件
`BidriectionalIterator`が`ValueSwappable`の要件を満たしていること。


##効果
`[first, last)`の範囲を前の順列に変換する。

`operator<`または`comp`によって辞書順に並んでいる全ての順列の集合があると仮定すると、前の順列が発見される。


##戻り値
前の順列が存在する場合は`true`を返し、そうでなければ`false`を返す。


##計算量
高々`(last - first)/2`回の要素の交換


##例
```cpp
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
  std::vector<int> v = {3, 2, 1};

  do {
    print(v);
  } while (std::prev_permutation(v.begin(), v.end()));
}
```
* std::prev_permutation[color ff0000]

###出力
```
3 2 1 
3 1 2 
2 3 1 
2 1 3 
1 3 2 
1 2 3 
```


##実装例
```cpp
template <class BidirectionalIterator, class Compare>
bool prev_permutation(BidirectionalIterator first, BidirectionalIterator last, Compare comp)
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
    if (comp(*ii, *i)) {
      BidirectionalIterator j = last;
      while (!comp(*--j, *i)) {}

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
bool prev_permutation(BidirectionalIterator first, BidirectionalIterator last)
{
  typedef
    typename std::iterator_traits<BidirectionalIterator>::value_type
  value_type;

  return prev_permutation(first, last, std::less<value_type>());
}
```
* std::reverse[link reverse.md]
* std::iterator_traits[link /reference/iterator/iterator_traits.md]
* std::less[link /reference/functional/less.md]

