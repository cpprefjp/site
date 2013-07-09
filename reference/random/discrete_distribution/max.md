#max(C++11)
```cpp
result_type max() const;
```

##概要
最大値を取得する。


##戻り値
最大のインデックスである「確率列の要素数 - 1」を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::discrete_distribution<> dist = {0.1, 0.2, 0.3};

  int max_value = dist.max();
  std::cout << max_value << std::endl;
}
```

###出力
```
2
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


