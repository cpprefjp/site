#operator>=
* queue[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Container>
  bool operator>=(const queue<T, Container>& x, const queue<T, Container>& y);
}
```

##概要
`queue`において、左辺が右辺以上かを判定する。


##戻り値
```cpp
x.c >= y.c
```


##例
```cpp
#include <iostream>
#include <queue>

int main ()
{
  std::queue<int> x;
  x.push(4);
  x.push(5);
  x.push(6);

  std::queue<int> y;
  y.push(1);
  y.push(2);
  y.push(3);

  std::cout << std::boolalpha << (x >= y) << std::endl;
}
```
* x >= y[color ff0000]
* push[link push.md]

###出力
```
true
```

##参照


