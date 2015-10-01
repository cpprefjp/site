#operator<
* array[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, size_t N>
  bool operator<(const array<T, N>& x, const array<T, N>& y);
}
```

##概要
`array`において、左辺が右辺より小さいかの判定を行う。


##要件
型`T`が`<`比較可能であること。その`<`が全順序関係を持っていること。


##戻り値
[`lexicographical_compare`](/reference/algorithm/lexicographical_compare.md)`(x.`[`begin`](./begin.md)`(), x.`[`end`](./end.md)`(), y.`[`begin`](./begin.md)`(), y.`[`end`](./end.md)`());`


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <array>

int main ()
{
  std::array<int, 3> x = {1, 2, 3};
  std::array<int, 3> y = {4, 5, 6};

  if (x < y) {
    std::cout << "less" << std::endl;
  }
  else {
    std::cout << "greater equal" << std::endl;
  }
}
```

###出力
```
less
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0


##参照

