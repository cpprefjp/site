#mean(C++11)
```cpp
result_type alpha() const;
```

##概要
形状母数(shape parameter)を取得する。


##戻り値
構築時に設定された、形状母数の値を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::gamma_distribution<> dist(1.0, 1.0);

  double alpha = dist.alpha();
  std::cout << alpha << std::endl;
}
```

###出力
```
1.0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 3.0
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


