#max (C++11)
```cpp
result_type max() const;
```

##概要
生成する範囲の最大値を取得する。


##戻り値
値の範囲の最大値を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::cauchy_distribution<> dist(0.0, 1.0);

  double max_val = dist.max();
  std::cout << max_val << std::endl;
}
```

###出力例
```
1.79769e+308
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


