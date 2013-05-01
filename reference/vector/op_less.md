#operator<
```cpp
namespace std {
  template <class T, class Allocator>
  bool operator<(const vector<T, Allocator>& x, const vector<T, Allocator>& y);
}
```

##概要

<b>vectorにおいて、左辺が右辺より小さいかの判定を行う。</b>


##要件

型`T`が`<`比較可能であること。その`<`が全順序関係を持っていること。


##戻り値

`[lexicographical_compare](/reference/algorithm/lexicographical_compare.md)(x.[begin](/reference/vector/begin.md)(), x.[end](/reference/vector/end.md)(), y.[begin](/reference/vector/begin.md)(), y.[end](/reference/vector/end.md)());`

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

  std::cout << (v1 < v2) << std::endl;
}
```
* <[color ff0000]

###出力

```cpp
true
```

##参照


