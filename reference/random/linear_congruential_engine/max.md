#max (C++11)
```cpp
static constexpr result_type max() { return M - 1u; }
```

##概要
生成する値の最大値を取得する。


##戻り値
パラメータ`M - 1u`を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::uint32_t max_value = std::minstd_rand::max();
  std::cout << max_value << std::endl;
}
```

###出力
```
2147483646
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


