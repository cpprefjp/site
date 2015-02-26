#min (C++11)
* random[meta header]
* std[meta namespace]

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
  std::cauchy_distribution<> dist(0.0, 1.0);

  double min_val = dist.min();
  std::cout << min_val << std::endl;
}
```

###出力例
```
2.22507e-308
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照


