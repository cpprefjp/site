#stable_sort
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void stable_sort(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void stable_sort(RandomAccessIterator first, RandomAccessIterator last,
                   Compare comp);
}
```

##概要
範囲を安定ソートで並べ替える


##要件
`RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


##効果
`[first,last)` の範囲をソートする


##戻り値
なし


##計算量
最大で N log^2(N) （N == `last - first`）回の比較を行う。ただし、十分なメモリがあれば N log(N) になる。


##備考
同じ値が複数あった場合に、ソート前の位置関係が保たれる、「安定ソート」を行う。
一般的なマージソートで実装される。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // 並べ替える
  std::stable_sort(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::stable_sort[color ff0000]
* std::for_each[link for_each.md]

###出力
```
1
2
3
4
5
```

