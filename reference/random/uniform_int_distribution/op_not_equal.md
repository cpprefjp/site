#operator!= (C++11)
* random[meta header]
* std[meta namespace]
* uniform_int_distribution[meta class]

```cpp
namespace std {
  template <class IntType>
  bool operator!=(
    const uniform_int_distribution<IntType>& a,
    const uniform_int_distribution<IntType>& b);
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
  std::uniform_int_distribution<> a(0, 3);
  std::uniform_int_distribution<> b(0, 4);

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


