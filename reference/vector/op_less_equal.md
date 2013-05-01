#operator<=
```cpp
namespace std {
  template <class T, class Allocator>
  bool operator<=(const vector<T, Allocator>& x, const vector<T, Allocator>& y);
}
```

##概要

<b>vectorにおいて、左辺が右辺以下かを判定する。</b>


##戻り値

!(a [>](/reference/vector/op_greater.md) b)

##計算量

線形時間


##例

```cpp
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {4, 5, 6};

  std::cout << std::boolalpha;

  std::cout << (v1 <= v2) << std::endl;
}
```
* <=[color ff0000]

###出力

```cpp
true
```

##参照


