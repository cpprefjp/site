#operator<=
* queue[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T, class Container>
  bool operator<=(const queue<T, Container>& x, const queue<T, Container>& y);
}
```

##概要
`queue`において、左辺が右辺以下かを判定する。


##戻り値
`x.c <= y.c`


##例
```cpp
#include <iostream>
#include <queue>

int main ()
{
  std::queue<int> x;
  x.push(1);
  x.push(2);
  x.push(3);

  std::queue<int> y;
  y.push(4);
  y.push(5);
  y.push(6);

  std::cout << std::boolalpha << (x <= y) << std::endl;
}
```
* x <= y[color ff0000]

###出力
```
true
```

##参照


