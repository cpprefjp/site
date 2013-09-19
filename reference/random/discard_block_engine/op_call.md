#operator()(C++11)
```cpp
result_type operator()();
```

##概要
乱数生成を行う。


#効果
ランダムな値を生成し、内部状態を進める。


##戻り値
ランダムな値を生成して返す。  
値の範囲は`[`[`min()`](./min.md), [`max()`](.max.md)`]`である。つまり、最小値と最大値両方を含む。


##計算量
償却定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::ranlux24 engine;

  for (int i = 0; i < 10; ++i) {
    // 乱数生成
    std::uint32_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* ranlux24[link /reference/random/ranlux24.md]


###出力例
```
15039276
16323925
14283486
7150092
68089
8584138
4918023
11368221
8644539
8342712
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


