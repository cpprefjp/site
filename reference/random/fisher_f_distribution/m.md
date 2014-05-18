#m (C++11)
```cpp
result_type m() const;
```

##概要
自由度mを取得する。


##戻り値
構築時に設定された、自由度mを返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::fisher_f_distribution<> dist(3.0, 4.0);

  double m = dist.m();
  std::cout << m << std::endl;
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


