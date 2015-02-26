#operator==
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator==(const deque<T, Allocator>& x, const deque<T, Allocator>& y);
}
```

##概要
`deque`オブジェクトの等値比較を行う。


##要件
型`T`が`==`で比較可能であること。


##効果
`x.`[`size`](./size.md)`() == y.`[`size`](./size.md)`() && `[`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](./begin.md)`(), x.`[`end`](./end.md)`(), y.`[`begin`](./begin.md)`());`


##戻り値
`x`と`y`の要素数および要素の値が等しければ`true`、そうでなければ`false`を返す。


##計算量
`x.`[`size()`](./size.md)に対して線形時間


##例
```cpp
#include <iostream>
#include <deque>

int main ()
{
  std::deque<int> c1 = {1, 2, 3};
  std::deque<int> c2 = {1, 2, 3};
  std::deque<int> c3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (c1 == c2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (c1 == c3) << std::endl;
}
```
* ==[color ff0000]

###出力
```
true
false
```

##参照


