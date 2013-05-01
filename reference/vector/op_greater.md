#operator>
```cpp
namespace std {
  template <class T, class Allocator>
  bool operator>(const vector<T, Allocator>& x, const vector<T, Allocator>& y);
}
```

##概要

<b>vectorにおいて、左辺が右辺より大きいかを判定する。</b>


##戻り値

y [<](/reference/vector/op_less.md) x

##計算量

線形時間


##備考



##例

```cpp
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> v1 = {4, 5, 6};
  std::vector<int> v2 = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (v1 > v2) << std::endl;
}
```
* >[color ff0000]

###出力

```cpp
true
```

##参照


