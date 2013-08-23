#lambda(C++11)
```cpp
result_type lambda() const;
```

##概要
指数分布のパラメータλを取得する。


##戻り値
構築時に設定された、`lambda`の値を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::exponential_distribution<> dist(1.0);

  double lambda = dist.lambda();
  std::cout << lambda << std::endl;
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
- [Clang](/implementation#clang.md): 3.0
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


