#partial_sort
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void partial_sort(RandomAccessIterator first,
                    RandomAccessIterator middle,
                    RandomAccessIterator last);

  template<class RandomAccessIterator, class Compare>
  void partial_sort(RandomAccessIterator first,
                    RandomAccessIterator middle,
                    RandomAccessIterator last,
                    Compare comp);
}
```

##概要
範囲を部分的にソートし、先頭N個を並んだ状態にする。

この関数は、「先頭に、最高品質の要素を品質順に集める」というような用途に使用する。「打ち上げランキング トップ10位まで」のように、全体ではなく一部の最高順位がわかればいい状況で、全体を並び替える[`sort()`](./sort.md)関数の代わりに使用できる。


##要件
`RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


##効果
`[first,last)` にある要素の中から、`middle - first` 個の要素をソート済みの状態で `[first,middle)` に配置する。残りの `[middle,last)` にある要素は unspecified order に配置される。


##戻り値
なし


##計算量
ほぼ `(last - first) * log(middle - first)` 回の比較を行う


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // 先頭2要素を並んだ状態にする
  std::partial_sort(v.begin(), v.begin() + 2, v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* partial_sort[color ff0000]


###出力
```
1
2
4
3
5
```


