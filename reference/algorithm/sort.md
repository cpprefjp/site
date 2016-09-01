#sort
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void sort(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void sort(RandomAccessIterator first, RandomAccessIterator last,
            Compare comp);
}
```

##概要
範囲を並べ替える


##要件
`RandomAccessIterator` は `ValueSwappable` の要求を満たしている必要がある。`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


##効果
`[first,last)` の範囲をソートする


##戻り値
なし


##計算量
- C++03: 平均して約N log N (N == `last - first`) 回の比較
- C++11以降: N log N (N == `last - first`) 回の比較


##備考
実装のアルゴリズムとしては、クイックソートもしくはその改良版であるイントロソートが使われることが多い。

(※特定のアルゴリズムで実装すべきという規定はない)


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // 並べ替える
  std::sort(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::sort[color ff0000]

###出力
```
1
2
3
4
5
```


##参照
- [LWG Issue 713. `sort()` complexity is too lax](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#713)
    - C++11で、イントロソートアルゴリズムを考慮して、計算量の規定が見直された経緯のレポート

