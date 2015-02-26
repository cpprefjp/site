#operator!= (C++11)
* random[meta header]
* std[meta namespace]
* gamma_distribution[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class RealType>
  bool operator!=(
    const gamma_distribution<RealType>& a,
    const gamma_distribution<RealType>& b);
}
```

##概要
非等値比較を行う。


##戻り値
`!(a == b)`


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::gamma_distribution<> a(1.0, 1.0);
  std::gamma_distribution<> b(1.0, 1.5);

  if (a != b) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```

###出力
```
not equal
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


