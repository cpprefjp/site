#stable_partition
```cpp
namespace std {
  template<class BidirectionalIterator, class Predicate>
  BidirectionalIterator stable_partition(BidirectionalIterator first,
                                         BidirectionalIterator last,
                                         Predicate pred);
}
```

##概要
与えられた範囲を条件によって 2 つのグループに順序を保ったまま分ける。


##要件
`BidirectionalIterator` は `ValueSwappable` の要件を満たしている必要がある。
`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。



##効果
`[first,last)` 内にある `pred` を満たす全ての要素を、`pred` を満たさない全ての要素より前に移動させる。


##戻り値
`[first,i)` 内にあるイテレータ `j` について `pred(*j) != false` を満たし、`[i,last)` 内にあるイテレータ `k` について `pred(*k) == false` を満たすような、イテレータ `i` を返す。
つまり、partition された境界部分のイテレータを返す。
両方のグループの順序は維持されている。


##計算量
最大で `(last - first) * log(last - first)` 回 swap が行われるが、余分なメモリを使って構わないのであれば線形回数の swap になる。
正確に `last - first` 回述語が適用される。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 偶数グループと奇数グループに分ける
  std::stable_partition(v.begin(), v.end(), [](int x) { return x % 2 == 0; });

  std::for_each(v.begin(), v.end(), [](int x) {
   std::cout << x << std::endl;
  });
}
```
* stable_partition[color ff0000]


###出力
```
2
4
1
3
5
```


##実装例
```cpp
```


##参照

