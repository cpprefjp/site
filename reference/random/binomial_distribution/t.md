#t(C++11)
```cpp
IntType t() const;
```

##概要
試行回数`t`を取得する。


##戻り値
構築時に設定された、試行回数`t`を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::binomial_distribution<> dist(3, 0.5);

  int t = dist.t();
  std::cout << t << std::endl;
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


