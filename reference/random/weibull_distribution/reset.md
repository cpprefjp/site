#reset (C++11)
* random[meta header]
* std[meta namespace]
* weibull_distribution[meta class]
* function[meta id-type]

```cpp
void reset();
```

##概要
状態をリセットする。  
この関数を呼び出すことで、後続の乱数生成が、前回の乱数生成によって変更されうる状態に依存せずに行うことができる。


##効果
内部の状態をリセットする。


##戻り値
なし


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  std::weibull_distribution<> dist(1.0, 1.0);

  for (int i = 0; i < 5; ++i) {
    dist.reset(); // 前回生成までの状態をリセット
    std::cout << dist(engine) << std::endl;
  }
}
```


###出力例
```
0.176404
0.0425107
0.156545
1.34203
1.27406
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


