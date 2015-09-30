#inserter
* iterator[meta header]
* std[meta namespace]
* insert_iterator[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class Container>
  insert_iterator<Container> inserter(Container& x, typename Container::iterator i);
}
```

##概要
`insert_iterator`のヘルパ関数


##戻り値
`insert_iterator<Container>(x, i)`


##例
```cpp
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
* std::front_inserter[color ff0000]
* std::set[link /reference/set/set.md]
* begin()[link /reference/set/set/begin.md]
* end()[link /reference/set/set/end.md]
* std::copy[link /reference/algorithm/copy.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
1
2
3
```

##参照
