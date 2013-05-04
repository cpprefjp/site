#operator<=
```cpp
namespace std {
  template <class T, size_t N>
  bool operator<=(const array<T, N>& x, const array<T, N>& y);
}
```

##概要
`array`において、左辺が右辺以下かを判定する。


##戻り値
`!(a `[`>`](./greater.md)` b)`


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

  std::cout << std::boolalpha;

  std::cout << (x <= y) << std::endl;
}
```
* <=[color ff0000]


###出力
```
true
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照

