#operator>
* deque[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator>(const deque<T, Allocator>& x, const deque<T, Allocator>& y);
}
```

##概要
`deque`において、左辺が右辺より大きいかを判定する。


##戻り値
`y `[`<`](./op_less.md)` x`


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <deque>

int main ()
{
  std::deque<int> c1 = {4, 5, 6};
  std::deque<int> c2 = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (c1 > c2) << std::endl;
}
```

###出力
```
true
```

##参照


