#operator!=
* list[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator!=(const list<T, Allocator>& x, const list<T, Allocator>& y);
}
```

##概要
`list`オブジェクトの非等値比較を行う。


##要件
型`T`が`operator==`で比較可能であること。


##戻り値
`!(x == y)`


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <list>

int main ()
{
  std::list<int> ls1 = {1, 2, 3};
  std::list<int> ls2 = {1, 2, 3};
  std::list<int> ls3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (ls1 != ls2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (ls1 != ls3) << std::endl;

}
```

###出力
```
false
true
```


