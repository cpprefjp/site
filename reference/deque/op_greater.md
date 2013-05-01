#operator>
```cpp
namespace std {
  template <class T, class Allocator>
  bool operator>(const deque<T, Allocator>& x, const deque<T, Allocator>& y);
}
```

##概要

<b>dequeにおいて、左辺が右辺より大きいかを判定する。</b>


##戻り値

y [<](/reference/deque/op_less.md) x


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
* >[color ff0000]

###出力

```cpp
true
```

##参照


