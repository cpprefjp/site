#operator==
```cpp
namespace std {  template <class T, class Allocator>
  bool operator==(const vector<T, Allocator>& x, const vector<T, Allocator>& y);
}
```

##概要

<b>vectorオブジェクトの等値比較を行う。</b>


##要件

型`T`が`==`で比較可能であること。


##効果

`x.[size](/reference/vector/size.md)() == y.[size](/reference/vector/size.md)() && [equal](/reference/algorithm/equal.md)(x.[begin](/reference/vector/begin.md)(), x.[end](/reference/vector/end.md)(), y.[begin](/reference/vector/begin.md)());`

##戻り値

`x`と`y`の要素数および要素の値が等しければ`true`、そうでなければ`false`を返す。


##計算量

線形時間


##備考



##例

```cpp
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {1, 2, 3};
  std::vector<int> v3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (v1 == v2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (v1 == v3) << std::endl;
}
```
* ==[color ff0000]
* ==[color ff0000]

###出力

```cpp
true
false
```

##参照


