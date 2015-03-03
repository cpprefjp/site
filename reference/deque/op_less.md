#operator<
* deque[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator<(const deque<T, Allocator>& x, const deque<T, Allocator>& y);
}
```

##概要
`deque`において、左辺が右辺より小さいかの判定を行う。


##要件
型`T`が`<`比較可能であること。その`<`が全順序関係を持っていること。


##戻り値
[`lexicographical_compare`](/reference/algorithm/lexicographical_compare.md)`(x.`[`begin`](./begin.md)`(), x.`[`end`](./end.md)`(), y.`[`begin`](./begin.md)`(), y.`[`end`](./end.md)`());`


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

  std::cout << (c1 < c2) << std::endl;
}
```

###出力
```
true
```

##参照


