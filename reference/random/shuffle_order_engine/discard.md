#discard(C++11)
```cpp
void discard(unsigned long long z);
```

##概要
指定した回数だけ乱数を生成し、内部状態を進める。


##効果
`*this`を`e`とした場合、 

```cpp
for (unsigned long long i = 0; i < z; ++i) {
  e();
}
```

と同じ効果を持つ。  
指定された回数だけ乱数生成を行い、結果を破棄する。  


##戻り値
なし


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::knuth_b engine;

  for (int i = 0; i < 5; ++i) {
    engine();
  }

  std::cout << engine() << std::endl;

  // エンジンを再初期化し、内部状態を5回進める
  // 上のコードで生成した乱数と同じ結果が得られる
  engine.seed();
  engine.discard(5);

  std::cout << engine() << std::endl;
}
```
* knuth_b[link /reference/random/knuth_b.md]

###出力
```
280090412
280090412
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


