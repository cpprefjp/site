# operator==
* stack[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Container>
  bool operator==(const stack<T, Container>& x, const stack<T, Container>& y);
}
```

## 概要
`stack` の�値比較を行う。


## 戻り値
`x.c == y.c`


## 例
```cpp example
#include <iostream>
#include <stack>

int main()
{
  std::stack<int> x;
  x.push(3);
  x.push(1);
  x.push(4);

  std::stack<int> y;
  y.push(3);
  y.push(1);
  y.push(4);

  std::cout << std::boolalpha << (x == y) << std::endl;
}
```
* push[link push.md]

### 出力
```
true
```

## 参照


