# back_inserter
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Container>
  back_insert_iterator<Container> back_inserter(Container& x);           // (1) C++03

  template <class Container>
  constexpr back_insert_iterator<Container> back_inserter(Container& x); // (1) C++20
}
```
* back_insert_iterator[link back_insert_iterator.md]

## 概要
`back_insert_iterator`のヘルパ関数。


## 戻り値
```cpp
back_insert_iterator<Container>(x)
```
* back_insert_iterator[link back_insert_iterator.md]


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

int main()
{
  std::vector<int> src = {1, 2, 3};
  std::vector<int> dest;

  // srcの要素をdestに追加しながらコピー
  dest.reserve(src.size());
  std::copy(src.begin(), src.end(), std::back_inserter(dest));

  for (int x : dest) {
    std::cout << x << std::endl;
  }
}
```
* std::back_inserter[color ff0000]
* dest.reserve[link /reference/vector/vector/reserve.md]
* src.size()[link /reference/vector/vector/size.md]
* src.begin()[link /reference/vector/vector/begin.md]
* src.end()[link /reference/vector/vector/end.md]

### 出力
```
1
2
3
```

## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
