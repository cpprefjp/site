#operator== (C++11)
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator==(const forward_list<T, Allocator>& x, const forward_list<T, Allocator>& y);
}
```

##概要
`forward_list`オブジェクトの等値比較を行う。


##要件
型`T`が`==`で比較可能であること。


##効果
[`distance`](/reference/iterator/distance.md)`(x.`[`begin`](./begin.md)`(), x.`[`end`](./end.md)`()) == `[`distance`](/reference/iterator/distance.md)`(y.`[`begin`](./begin.md)`(), y.`[`end`](./end.md)`()) && `[`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](./begin.md)`(), x.`[`end`](./end.md)`(), y.`[`begin`](./begin.md)`());`


##戻り値
`x`と`y`の要素数および要素の値が等しければ`true`、そうでなければ`false`を返す。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <forward_list>

int main ()
{
  std::forward_list<int> ls1 = {1, 2, 3};
  std::forward_list<int> ls2 = {1, 2, 3};
  std::forward_list<int> ls3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (ls1 == ls2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (ls1 == ls3) << std::endl;
}
```
* ls1 == ls2[color ff0000]

###出力
```
true
false
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


