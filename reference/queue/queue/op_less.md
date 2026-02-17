# operator<
* queue[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Container>
  bool operator<(const queue<T, Container>& x, const queue<T, Container>& y);           // (1) C++03
  template <class T, class Container>
  constexpr bool operator<(const queue<T, Container>& x, const queue<T, Container>& y); // (1) C++26
}
```

## 概要
`queue`において、左辺が右辺より小さいかの判定を行う。


## 戻り値
```cpp
x.c < y.c
```


## 例
```cpp example
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

  std::cout << std::boolalpha << (x < y) << std::endl;
}
```
* x < y[color ff0000]
* push[link push.md]

### 出力
```
true
```

## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
