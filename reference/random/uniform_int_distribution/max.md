#max(C++11)
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
  std::uniform_int_distribution<> dist(0, 3);

  int max_value = dist.max();
  std::cout << max_value << std::endl;
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


