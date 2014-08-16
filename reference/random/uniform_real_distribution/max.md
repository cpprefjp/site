#max (C++11)
```cpp
result_type max() const;
```

##概要
生成する範囲の最大値を取得する。


##戻り値
構築時に設定された、値の範囲の最大値を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::uniform_real_distribution<> dist(0.0, 1.0);

  double max_value = dist.max();
  std::cout << max_value << std::endl;
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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


