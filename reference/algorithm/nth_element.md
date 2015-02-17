#nth_element
```cpp
namespace std {
  template <class RandomAccessIterator>
  void nth_element(RandomAccessIterator first, RandomAccessIterator nth,
                   RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void nth_element(RandomAccessIterator first, RandomAccessIterator nth,
                   RandomAccessIterator last, Compare comp);
}
```

##概要
基準となる要素よりも小さい要素が前に来るよう並べ替える。

この関数は、「先頭に、順不同でN個の最高品質な要素を集める」という目的に使用する。品質順が重要な場合には、[`partial_sort()`](./partial_sort.md)を使用する。


##要件
`RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


##効果
`nth_element()` を呼び出した後、`nth` が指している位置の要素は、全ての範囲がソートされた場合の位置にある要素になる。そして、`[first,nth)` にあるイテレータ `i` と、`[nth,last)` にあるイテレータ `j` について、`!(*j < *i)` または `comp(*j, *i) == false` になる。


##戻り値
なし


##計算量
平均で線形時間


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {5, 10, 4, 7, 1, 9, 8, 6, 2};

  // 4番目に小さい値より小さい値を前に集める
  std::nth_element(v.begin(), v.begin() + 3, v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* nth_element[color ff0000]

###出力
```
2
1
4
5
10
9
8
6
7
```

##参照
- [LWG Issue 2163. `nth_element` requires inconsistent post-conditions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2163)
    - C++11まで、この関数を呼び出したあとの状態について「`!(*i > *j)`」と記載していたが、並べ替えには`operator<()`を使用するので、C++14で「`!(*j < *i)`」に訂正。

