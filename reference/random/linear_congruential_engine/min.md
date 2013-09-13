#min(C++11)
```cpp
static constexpr result_type min() { return c == 0u ? 1u: 0u; }
```

##概要
生成する値の最小値を取得する。


##戻り値
テンプレートパラメータ`c`が`0`であれば`1`、そうでなければ`0`を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::uint32_t min_value = std::minstd_rand::min();
  std::cout << min_value << std::endl;
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


