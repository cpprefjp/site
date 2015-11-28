#front_inserter
* iterator[meta header]
* std[meta namespace]
* front_insert_iterator[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class Container>
  front_insert_iterator<Container> front_inserter(Container& x);
}
```
* front_insert_iterator[link front_insert_iterator.md]

##概要
`front_insert_iterator`のヘルパ関数。


##戻り値
```cpp
front_insert_iterator<Container>(x)
```
* front_insert_iterator[link front_insert_iterator.md]


##例
```cpp
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
* std::deque[link /reference/deque.md]
* begin()[link /reference/deque/begin.md]
* end()[link /reference/deque/end.md]
* std::copy[link /reference/algorithm/copy.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
3
2
1
```

##参照
