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

基準となる要素よりも小さい要素が前に来るよう並べ替える



##要件

RandomAccessIterator は ValueSwappable の要件を満たしている必要がある。*first の型は MoveConstructible と MoveAssignable の要件を満たしている必要がある。


##効果

nth_element を呼び出した後、nth が指している位置の要素は、全ての範囲がソートされた場合の位置にある要素になる。そして、[first,nth) にあるイテレータ i と、[nth,last) にあるイテレータ j について、!(*i > *j) または comp(*j, *i) == false になる。


##戻り値

なし


##計算量

平均すると線形


##備考



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

```cpp
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

##実装例

```cpp
```

##参照
```