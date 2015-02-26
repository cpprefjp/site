#operator== (C++11)
* random[meta header]

```cpp
namespace std {
  template <class IntType>
  bool operator==(
    const binomial_distribution<IntType>& a,
    const binomial_distribution<IntType>& b);
}
```

##概要
等値比較を行う。


##戻り値
`a.`[`param()`](./param.md)` == b.`[`param()`](./param.md)であり、かつ`a(g)`によって生成される値の無限シーケンス`S1`、`b(g)`によって生成される値の無限シーケンス`S2`が等しい場合`true`を返し、そうでなければ`false`を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::binomial_distribution<> a(3, 0.5);
  std::binomial_distribution<> b(3, 0.5);

  if (a == b) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```

###出力
```
equal
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


