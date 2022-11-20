# inserter
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Container>
  insert_iterator<Container>
    inserter(Container& x, typename Container::iterator i);   // (1) C++03

  template <class Container>
  constexpr insert_iterator<Container>
    inserter(Container& x, ranges::iterator_t<Container> i);  // (1) C++20
}
```
* insert_iterator[link insert_iterator.md]
* ranges::iterator_t[link /reference/ranges/iterator_t.md]

## 概要
`insert_iterator`のヘルパ関数


## 戻り値
```cpp
insert_iterator<Container>(x, i)
```
* insert_iterator[link insert_iterator.md]


## 例
```cpp example
#include <iostream>
#include <set>
#include <iterator>
#include <algorithm>

int main()
{
  std::set<int> src = {1, 2, 3};
  std::set<int> dest;

  // srcの要素をdestに挿入しながらコピー
  std::copy(src.begin(), src.end(), std::inserter(dest, dest.end()));

  for (int x : dest) {
    std::cout << x << std::endl;
  }
}
```
* std::inserter[color ff0000]
* src.begin()[link /reference/set/set/begin.md]
* src.end()[link /reference/set/set/end.md]
* dest.end()[link /reference/set/set/end.md]

### 出力
```
1
2
3
```

## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
