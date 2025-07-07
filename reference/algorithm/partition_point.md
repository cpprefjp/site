# partition_point
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator, class Predicate>
  ForwardIterator
    partition_point(ForwardIterator first,
                    ForwardIterator last,
                    Predicate pred);       // C++11

  template <class ForwardIterator, class Predicate>
  constexpr ForwardIterator
    partition_point(ForwardIterator first,
                    ForwardIterator last,
                    Predicate pred);       // C++20
}
```

## 概要
イテレータ範囲`[first, last)`から条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されている位置を得る。


## テンプレートパラメータ制約
- `ForwardIterator` の value type は `Predicate` の引数型へ変換可能であること


## 事前条件
- イテレータ範囲`[first,last)` は `pred` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。つまり、`pred` を満たす全ての要素が、`pred` を満たさない全ての要素より前に出現してなければならない


## 戻り値
[`all_of`](all_of.md)`(first, mid, pred)` と [`none_of`](none_of.md)`(mid, last, pred)` が `true` であるようなイテレータ `mid` を返す。


## 計算量
`pred` が O(log(`last - first`)) 回適用される。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

void print(const char* name, const std::vector<int>& v)
{
  std::cout << name << " : ";
  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << ",";
  });
  std::cout << std::endl;
}

bool is_even(int x) { return x % 2 == 0; }

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::partition(v.begin(), v.end(), is_even);

  // 偶数グループと奇数グループに分かれた位置を得る
  decltype(v)::iterator it = std::partition_point(v.begin(), v.end(), is_even);

  print("v", v);
  std::cout << *it << std::endl;
}
```
* std::partition_point[color ff0000]

### 出力
```
v : 4,2,3,1,5,
3
```

## 実装例
```cpp
template<class ForwardIterator, class Predicate>
ForwardIterator
partition_point(ForwardIterator first, ForwardIterator last, Predicate pred)
{
  for (auto len = std::distance(first, last); len != 0; ) {
    auto half = len / 2;
    auto mid = std::next(first, half);
    if (pred(*mid)) {
      len -= half + 1;
      first = std::next(mid);
    } else {
      len = half;
    }
  }
  return first;
}
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
