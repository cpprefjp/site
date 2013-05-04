#operator!=
```cpp
namespace std {
  template <class T, size_t N>
  bool operator!=(const array<T, N>& x, const array<T, N>& y);
}
```

##概要
`array`オブジェクトの非等値比較を行う


##要件
`array`の要素型`T`が`operator==`で比較可能であること。


##戻り値
`!(x `[`==`](./not_equal.md)` y)`


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> x = {1, 2, 3};
  std::array<int, 3> y = {1, 2, 3};

  if (x != y) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* !=[color ff0000]


###出力
```
not equal
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

