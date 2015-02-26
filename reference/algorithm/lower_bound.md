#lower_bound
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator, class T>
  ForwardIterator lower_bound(ForwardIterator first, ForwardIterator last,
                              const T& value);

  template<class ForwardIterator, class T, class Compare>
  ForwardIterator lower_bound(ForwardIterator first, ForwardIterator last,
                              const T& value, Compare comp);
}
```

##概要
指定された要素以上の値が現れる最初の位置のイテレータを取得する


##要件
- C++03 まで
	- `first`、`last` は前方向イテレータの要件を満たすこと。
	- `comp` は 2 引数の関数オブジェクトで、結果の型は `bool` 型に変換可能であること。また、引数に非 `const` の関数を適用しないこと。
	- `T` は　`LessThanComparable` であること。
	- `operator<` または `comp` は「[狭義の弱順序](../algorithm.md#strict-weak-ordering)」であること。
	- 範囲 `[first, last)` は `operator<` または `comp` を基準として昇順に並んでいること。
- C++11 から  
	- `first`、`last` は前方向イテレータの要件を満たすこと。
	- `comp` は 2 引数の関数オブジェクトで、結果の型は `bool` 型に変換可能であること。また、引数に非 `const` の関数を適用しないこと。
	- `[first,last)` の要素 `e` は `e < value` または `comp(e, value)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていること。
		つまり、`e < value` または `comp(e, value)` が `true` となる全ての要素 `e` は、`false` となる全ての要素よりも左側（`first` に近い方）になければならない。


##戻り値
`[first, last]` 内のイテレータ `i` のうち、以下の条件を満たす、最も右側（`first` から遠い方）のもの

- `[first, i)` 内の全てのイテレータ `j` が `*j < value` または `comp(*j, value) != false` である

（つまり、`value` 以上の要素のうち最初のものを指すイテレータ。`value` 以上の要素が無ければ `last`）


##計算量
最大で log2(`last - first`) + O(1) 回の比較を行う


##備考
- 本関数は、本質的に C++11 で追加された [`partition_point`](partition_point.md) と同一である。  
	具体的には、[`partition_point`](partition_point.md)`(first, last, [value](const T& e) { return e < value; })`、あるいは、[`partition_point`](partition_point.md)`(first, last, [value, comp](const T& e) { return comp(e, value); })` とすることで同一の結果が得られる。
- 本関数の要件は、上記の通り C++03 までの方が C++11 よりも厳しい。
	しかし、本アルゴリズムの特性上、処理系が C++03 までにしか準拠していない場合でも、昇順に並んでいなくても正常に動作する可能性は高いものと思われる。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  // lower_bound で 4 以上の要素の位置を検索する場合、
  // 4 より小さい物と 4 以上の物がその順に並んでいれば、
  // 必ずしもソートされている必要はない。
  std::vector<int> v = {3, 1, 4, 6, 5};

  // 4以上の要素を二分探索で検索
  decltype(v)::iterator it = std::lower_bound(v.begin(), v.end(), 4);

  std::cout << *it << ", pos = " << (it - v.begin()) << std::endl;
}
```
* lower_bound[color ff0000]
* iostream[link ../iostream.md]
* vector[link ../vector.md]
* algorithm[link ../algorithm.md]
* begin[link ../vector/begin.md]
* end[link ../vector/end.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]


###出力
```
4, pos = 2
```


##実装例
```cpp
template<class ForwardIterator, class T, class Compare>
ForwardIterator
lower_bound(ForwardIterator first, ForwardIterator last, const T& value, Compare comp)
{
  typedef typename std::iterator_traits<ForwardIterator>::difference_type diff;
  for (diff len = std::distance(first, last); len != 0; ) {
    diff half = len / 2;
    ForwardIterator mid = first;
    std::advance(mid, half);
    if (comp(*mid, value)) {
      len -= half + 1;
      first = ++mid;
    } else {
      len = half;
    }
  }
  return first;
}

// operator< 用の関数オブジェクト（std::less は特殊化されているかもしれないので）
struct less_inner {
  template <class T, class U>
  bool operator()(const T& lhs, const U& rhs) const { return bool(lhs < rhs); }
};

template<class ForwardIterator, class T>
inline ForwardIterator
lower_bound(ForwardIterator first, ForwardIterator last, const T& value)
{
  return std::lower_bound(first, last, value, less_inner());
}
```
* distance[link ../iterator/distance.md]
* advance[link ../iterator/advance.md]
* iterator_traits[link ../iterator/iterator_traits.md]
