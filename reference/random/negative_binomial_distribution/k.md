#k(C++11)
```cpp
IntType k() const;
```

##概要
目標とする成功回数`k`を取得する。


##戻り値
構築時に設定された、成功回数`k`を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::negative_binomial_distribution<> dist(3, 0.5);

  int k = dist.k();
  std::cout << k << std::endl;
}
```

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


