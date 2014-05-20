#operator() (C++11)
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
#include <cstdint>

int main()
{
  std::independent_bits_engine<std::mt19937, 64, std::uint64_t> engine;

  for (int i = 0; i < 10; ++i) {
    // 乱数生成
    std::uint64_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* mt19937[link /reference/random/mt19937.md]
* uint64_t[link /reference/random/uint64_t.md]


###出力例
```
152607844
823378840
578354438
2035308228
1004016855
280090412
101929267
1784484492
944975825
1190959745
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


