#back_inserter
* iterator[meta header]
* std[meta namespace]
* back_insert_iterator[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class Container>
  back_insert_iterator<Container> back_inserter(Container& x);
}
```

##概要
`back_insert_iterator`のヘルパ関数。


##戻り値
`back_insert_iterator<Container>(x)`


##例
```cpp
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
* std::vector[link /reference/vector.md]
* reserve[link /reference/vector/reserve.md]
* size()[link /reference/vector/size.md]
* begin()[link /reference/vector/begin.md]
* end()[link /reference/vector/end.md]
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
