#reset (C++11)
* random[meta header]

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


##備考
`normal_distribution`では、2つの正規分布乱数を同時に生み出し、偶数回目の呼び出しでは前回の呼び出しで使わなかった方を返す、という実装がありえる。そのような実装の場合に状態のリセットが効果を持つ。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  std::normal_distribution<> dist(0.0, 1.0);

  for (int i = 0; i < 5; ++i) {
    dist.reset(); // 前回生成までの状態をリセット
    std::cout << dist(engine) << std::endl;
  }
}
```


###出力例
```
-0.87146
0.532827
2.23796
-0.563936
1.57313
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


