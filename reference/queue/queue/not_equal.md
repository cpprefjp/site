#operator!=
```cpp
namespace std {

  template <class T, class Container>
  bool operator!=(const queue<T, Container>& x, const queue<T, Container>& y);

}
```

##概要

<b>queueの非等値比較を行う</b>


##戻り値

`x.c != y.c`

##備考



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
  y.push(1);
  y.push(2);
  y.push(3);

  std::cout << std::boolalpha;
  std::cout << (x != y) << std::endl;

  y.push(4);

  std::cout << (x != y) << std::endl; // not equal size
}
```
* !=[color ff0000]
* !=[color ff0000]

###出力

```cpp
false
true
```

##参照


