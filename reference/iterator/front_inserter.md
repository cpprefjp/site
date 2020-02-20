# front_inserter
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Container>
  front_insert_iterator<Container> front_inserter(Container& x);           // (1) C++03

  template <class Container>
  constexpr front_insert_iterator<Container> front_inserter(Container& x); // (1) C++20
}
```
* front_insert_iterator[link front_insert_iterator.md]

## 概要
`front_insert_iterator`のヘルパ関数。


## 戻り値
```cpp
front_insert_iterator<Container>(x)
```
* front_insert_iterator[link front_insert_iterator.md]


## 例
```cpp example
#include <iostream>
#include <deque>
#include <iterator>
#include <algorithm>

int main()
{
  std::deque<int> src = {1, 2, 3};
  std::deque<int> dest;

  // srcの要素をdestの先頭に追加しながらコピー
  std::copy(src.begin(), src.end(), std::front_inserter(dest));

  for (int x : dest) {
    std::cout << x << std::endl;
  }
}
```
* std::front_inserter[color ff0000]
* src.begin()[link /reference/deque/deque/begin.md]
* src.end()[link /reference/deque/deque/end.md]

### 出力
```
3
2
1
```

## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
