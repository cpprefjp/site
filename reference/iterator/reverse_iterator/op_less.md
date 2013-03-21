```cpp
namespace std {

  template <class Iterator1, class Iterator2>
  bool operator<(const reverse_iterator<Iterator1>& x,
                 const reverse_iterator<Iterator2>& y);

}
```

##概要

<b>2つのreverse_iteratorオブジェクトにおいて、左辺が右辺より小さいかを判定する。</b>



##戻り値

`x.current > y.current`

##例

```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());
  std::reverse_iterator<decltype(v)::iterator> it2(v.end() - 1);

  if (it1 < it2) {
    std::cout << "less" << std::endl;
  }
  else {
    std::cout << "not less" << std::endl;
  }
}
```
* it1 < it2[color ff0000]

###出力

```cpp
less
```

##参照


