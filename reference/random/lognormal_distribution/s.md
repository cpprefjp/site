#s (C++11)
```cpp
result_type s() const;
```

##概要
生成する範囲の標準偏差を取得する。


##戻り値
構築時に設定された、値の範囲の標準偏差を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::lognormal_distribution<> dist(0.0, 1.0);

  double s = dist.s();
  std::cout << s << std::endl;
}
```

###出力
```
1
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


