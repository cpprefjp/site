#min(C++11)
```cpp
result_type min() const;
```

##概要
生成する範囲の最小値を取得する。


##戻り値
最小の失敗回数である`0`を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::negative_binomial_distribution<> dist(3, 0.5);

  int min_value = dist.min();
  std::cout << min_value << std::endl;
}
```

###出力
```
0
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


