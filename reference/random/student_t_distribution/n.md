#n (C++11)
```cpp
result_type n() const;
```

##概要
自由度を取得する。


##戻り値
構築時に設定された、自由度を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::student_t_distribution<> dist(1.0);

  double n = dist.n();
  std::cout << n << std::endl;
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


