#operator<=
```cpp
namespace std {
  template <class T, class Allocator>
  bool operator<=(const deque<T, Allocator>& x, const deque<T, Allocator>& y);
}
```

##概要

<b>dequeにおいて、左辺が右辺以下かの判定を行う。</b>


##要件

型`T`が`<`比較可能であること。その`<`が全順序関係を持っていること。


##戻り値

!(a [>](/reference/deque/op_greater.md) b)


##計算量

線形時間


##例

```cpp
#include <iostream>
#include <deque>

int main ()
{
  std::deque<int> c1 = {1, 2, 3};
  std::deque<int> c2 = {4, 5, 6};

  std::cout << std::boolalpha;

  std::cout << (c1 <= c2) << std::endl;
}
```
* <=[color ff0000]

###出力

```cpp
true
```

##参照


