# lower_bound
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator, class T>
  ForwardIterator
    lower_bound(ForwardIterator first,
                ForwardIterator last,
                const T& value);       // (1) C++03

  template<class ForwardIterator, class T>
  constexpr ForwardIterator
    lower_bound(ForwardIterator first,
                ForwardIterator last,
                const T& value);       // (1) C++20

  template<class ForwardIterator, class T, class Compare>
  ForwardIterator
    lower_bound(ForwardIterator first,
                ForwardIterator last,
                const T& value,
                Compare comp);         // (2) C++03

  template<class ForwardIterator, class T, class Compare>
  constexpr ForwardIterator
    lower_bound(ForwardIterator first,
                ForwardIterator last,
                const T& value,
                Compare comp);         // (2) C++20
}
```

## 概要
指定された要素以上の値が現れる最初の位置のイテレータを取得する。

この関数の用途としては、ソート済み範囲に対して、任意の値を二分探索で見つけるために使用できる。[`std::multiset`](/reference/set/multiset.md)のように同じ�ーを持つ要素が複数あり、その全てを列挙したい場合にはこの関数の代わりに[`std::equal_range()`](equal_range.md)関数を使用できる。


## 要件
- C++03 まで
	- `first`、`last` は前方向イテレータの要件を満たすこと。
	- `comp` は 2 引数の関数オブジェクトで、結果の型は `bool` 型に変換可能であること。また、引数に非 `const` の関数を適用しないこと。
	- `T` は `LessThanComparable` であること。
	- `operator<` または `comp` は「[�義の弱順序](../algorithm.md#strict-weak-ordering)」であること。
	- 範囲 `[first, last)` は `operator<` または `comp` を基準として昇順に並んでいること。
- C++11 から  
	- `first`、`last` は前方向イテレータの要件を満たすこと。
	- `comp` は 2 引数の関数オブジェクトで、結果の型は `bool` 型に変換可能であること。また、引数に非 `const` の関数を適用しないこと。
	- `[first,last)` の要素 `e` は `e < value` または `comp(e, value)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていること。
		つまり、`e < value` または `comp(e, value)` が `true` となる全ての要素 `e` は、`false` となる全ての要素よりも左側（`first` に近い方）になければならない。


## 戻り値
`[first, last]` 内のイテレータ `i` のうち、以下の条件を満たす、最も右側（`first` から遠い方）のもの

- `[first, i)` 内の全てのイテレータ `j` が `*j < value` または `comp(*j, value) != false` である

（つまり、`value` 以上の要素のうち最初のものを指すイテレータ。`value` 以上の要素が無ければ `last`）


## 計算量
最大で log2(`last - first`) + 1 回の比較を行う


## 備考
- 本関数は、本質的に C++11 で追加された [`partition_point`](partition_point.md) と�価である。  
	具体的には、[`partition_point`](partition_point.md)`(first, last, [value](const T& e) { return e < value; })`、あるいは、[`partition_point`](partition_point.md)`(first, last, [value, comp](const T& e) { return comp(e, value); })` とすることで�価の結果が得られる。
- 本関数の要件は、上記の通り C++03 までの方が C++11 よりも厳しい。
	しかし、本アルゴリズムの特性上、処理系が C++03 までにしか準拠していない場合でも、昇順に並んでいなくても�常に動作する可能性は高いものと思われる。


## 例
```cpp example
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

struct X {
  int id;
  std::string name;
};

int main()
{
  // この関数単体としての使い方
  {
    // lower_bound で 4 以上の要素の位置を検索する場合、
    // 4 より小さい物と 4 以上の物がその順に並んでいれば、
    // 必ずしもソートされている必要はない。
    std::vector<int> v = {3, 1, 4, 6, 5};

    // 4以上の要素を二分探索で検索
    decltype(v)::iterator it = std::lower_bound(v.begin(), v.end(), 4);
    if (it != v.end()) {
      std::size_t pos = std::distance(v.begin(), it);
      std::cout << *it << " pos=" << pos << std::endl;
    }
  }

  // 基本的な用途
  // ソート済み範囲から、特定の値を二分探索で見つける
  {
    std::vector<int> v = {3, 1, 4, 6, 5};
    std::sort(v.begin(), v.end());

    // 二分探索で値4を検索
    decltype(v)::iterator it = std::lower_bound(v.begin(), v.end(), 4);
    if (it != v.end() && *it == 4) { // lower_boundでは4"以上"の値が見つかるので、
                                     // 値4を見つけたいなら検索結果の値を比較する必要がある
      std::size_t pos = std::distance(v.begin(), it);
      std::cout << *it << " pos=" << pos << std::endl;
    }
  }

  // 要素の一部の値を比較して見つける
  {
    // 要素は複数のメンバ変数をもつ
    std::vector<X> v = {
      {1, "Carol"},
      {3, "Alice"},
      {4, "Bob"},
      {5, "Eve"},
      {6, "Dave"}
    };

    const std::string key = "Bob";

    // X::nameメンバ変数を�ーにして、
    // X::name == "Bob"となる要素を二分探索で見つける
    decltype(v)::iterator it = std::lower_bound(
      v.begin(),
      v.end(),
      X{-1, key}, // nameのみを比較するので、idの値はなんでもよい
      [](const X& a, const X& b) { return a.name < b.name; }
    );

    if (it != v.end() && it->name == key) {
      std::size_t pos = std::distance(v.begin(), it);
      std::cout << "id=" << it->id
                << " name=" << it->name
                << " pos=" << pos
                << std::endl;
    }
  }
}
```
* std::lower_bound[color ff0000]

### 出力
```
4 pos=2
4 pos=2
id=4 name=Bob pos=2
```


## 実装例
```cpp
template<class ForwardIterator, class T, class Compare>
ForwardIterator
lower_bound(ForwardIterator first, ForwardIterator last, const T& value, Compare comp)
{
  using diff = typename std::iterator_traits<ForwardIterator>::difference_type;
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
* std::advance[link /reference/iterator/advance.md]
* std::iterator_traits[link /reference/iterator/iterator_traits.md]

## 参照
- [LWG Issue 384. `equal_range` has unimplementable runtime complexity](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#384)
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
