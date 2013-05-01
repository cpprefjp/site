#partition
```cpp
namespace std {
  // C++03 バージョン : 双方向イテレータを要求する
  template <class BidirectionalIterator, class Predicate>
  BidirectionalIterator partition(BidirectionalIterator first, BidirectionalIterator last, Predicate pred);

  // C++11 バージョン : 単方向イテレータを要求する
  template <class ForwardIterator, class Predicate>
  ForwardIterator partition(ForwardIterator first, ForwardIterator last, Predicate pred);
}
```

##概要

<b>与えられた範囲を条件によって 2 つのグループに分ける。</b>


##要件
ForwardIterator は ValueSwappable の要件を満たしている必要がある。

##効果

[first,last) 内にある pred を満たす全ての要素を、pred を満たさない全ての要素より前に移動させる。


##戻り値

[first,i) 内にあるイテレータ j について pred(*j) != false を満たし、[i,last) 内にあるイテレータ k について pred(*k) == false を満たすような、イテレータ i を返す。つまり、partition された境界部分のイテレータを返す。


##計算量

ForwardIterator が BidirectionalIterator の要求を満たしている場合、最大で (last - first) / 2 回 swap される。
そうでない場合、最大で last - first 回 swap される。
正確に last - first 回述語が適用される。


##例

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 偶数グループと奇数グループに分ける
  std::partition(v.begin(), v.end(), [](int x) { return x % 2 == 0; });

  std::for_each(v.begin(), v.end(), [](int x) {
   std::cout << x << std::endl;
  });
}
```
* partition[color ff0000]

###出力

```cpp
4
2
3
1
5
```

##実装例

```cpp
template <class ForwardIterator, class Predicate>
ForwardIterator partition(ForwardIterator first, ForwardIterator last, Predicate pred)
{
  first = std::find_if_not(first, last, pred);
  auto it = std::find_if(first, last, pred);
  while (it != last) {
    std::iter_swap(first, it);
    first = std::find_if_not(first, last, pred);
    it = std::find_if(it, last, pred);
  }
  return first;
}
```

##参照


