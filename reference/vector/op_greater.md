#operator>
* vector[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator>(const vector<T, Allocator>& x, const vector<T, Allocator>& y);
}
```

##概要
`vector`において、左辺が右辺より大きいかを判定する。


##戻り値
`y` [`<`](op_less.md) `x`


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> v1 = {4, 5, 6};
  std::vector<int> v2 = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (v1 > v2) << std::endl;
}
```

###出力
```
true
```

##参照


