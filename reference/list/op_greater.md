#operator>
* list[meta header]
* std[meta namespace]
* list[meta class]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator>(const list<T, Allocator>& x, const list<T, Allocator>& y);
}
```

##概要
`list`において、左辺が右辺より大きいかを判定する。


##戻り値
`b < a`


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <list>

int main ()
{
  std::list<int> ls1 = {4, 5, 6};
  std::list<int> ls2 = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (ls1 > ls2) << std::endl;
}
```


###出力
```
true
```


