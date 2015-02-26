#b (C++11)
* random[meta header]
* std[meta namespace]

```cpp
result_type b() const;
```

##概要
尺度母数を取得する。


##戻り値
構築時に設定された、尺度母数を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::cauchy_distribution<> dist(0.0, 1.0);

  double scale = dist.b();
  std::cout << scale << std::endl;
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


