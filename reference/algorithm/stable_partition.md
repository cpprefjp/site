# stable_partition
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class BidirectionalIterator, class Predicate>
  BidirectionalIterator
    stable_partition(BidirectionalIterator first,
                     BidirectionalIterator last,
                     Predicate pred);             // (1) C++03
  template<class BidirectionalIterator, class Predicate>
  constexpr BidirectionalIterator
    stable_partition(BidirectionalIterator first,
                     BidirectionalIterator last,
                     Predicate pred);             // (1) C++26

  template <class ExecutionPolicy, class BidirectionalIterator, class Predicate>
  BidirectionalIterator
    stable_partition(ExecutionPolicy&& exec,
                     BidirectionalIterator first,
                     BidirectionalIterator last,
                     Predicate pred);             // (2) C++17
}
```

## 概要
与えられたイテレータ範囲`[first, last)`を相対順序を保ちながら条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する。


## テンプレートパラメータ制約
- `BidirectionalIterator` は `ValueSwappable` の要件を満たしていること
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること


## 効果
`[first,last)` 内にある `pred` を満たす全ての要素を、`pred` を満たさない全ての要素より前に移動させる。


## 戻り値
`[first,i)` 内にあるイテレータ `j` について `pred(*j) != false` を満たし、`[i,last)` 内にあるイテレータ `k` について `pred(*k) == false` を満たすような、イテレータ `i` を返す。

つまり、[区分化](/reference/algorithm.md#sequence-is-partitioned)された境界を指すイテレータを返す。

条件を満たす・満たさない両グループ内での要素間の相対順序は保たれる。


## 計算量
`N = last - first`として説明する。

- (1) : 最大でN log N回 swap が行われるが、余分なメモリを使って構わないのであれば線形回数の swap になる。それに加えて、正確にN回だけ述語が適用される
- (2) : O(N log N) 回の swap に加え、述語が O(N) 回適用される


## 例
```cpp example
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
* std::stable_partition[color ff0000]

### 出力
```
2
4
1
3
5
```


## 参照
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
- [P0574R1 Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [P2562R1 `constexpr` Stable Sorting](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2562r1.pdf)
    - C++26から`constexpr`に対応した
