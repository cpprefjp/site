#min(C++11)
```cpp
result_type min() const;
```

##概要
生成する範囲の最小値を取得する。


##戻り値
構築時に設定された、値の範囲の最小値を返す。  


##備考
Boost.Randomとlibc++(Clang)の実装では、`-`[`numeric_limits`](/reference/limits/numeric_limits.md)`::`[`infinity()`](/reference/limits/numeric_limits/infinity.md)を返す。

GCC 4.8.1時点でのlibstdc++の実装では、[`numeric_limits`](/reference/limits/numeric_limits.md)`::`[`min()`](/reference/limits/numeric_limits/min.md)を返す。これはつまり`0.0`を意味するが、実際には`0.0`未満の値を生成するため、これはバグだと思われる。 [Bug 58098 - wrong return value of normal_distribution::min()](http://gcc.gnu.org/bugzilla/show_bug.cgi?id=58098)


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::normal_distribution<> dist(0.0, 1.0);

  double min_val = dist.min();
  std::cout << min_val << std::endl;
}
```

###出力例
```
-inf
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 3.0
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??


##参照


