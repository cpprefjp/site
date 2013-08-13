#min(C++11)
```cpp
result_type min() const;
```

##概要
生成する範囲の最小値を取得する。


##戻り値
値の範囲の最小値を返す。  


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::gamma_distribution<> dist(1.0, 1.0);

  double min_val = dist.min();
  std::cout << min_val << std::endl;
}
```

###出力例
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 3.0
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??


##参照


