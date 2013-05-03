#tanh
```cpp
namespace std {  float tanh(float x);  double tanh(double x);  long double tanh(long double x);  template<class Integral>  double tanh(Integral x);   // C++11}
```

##概要

<b>算術型の双曲線正接（ハイパボリックタンジェント）を求める。</b>


##戻り値

引数 x の双曲線正接を返す。


##備考

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/tanh/tanh.png)



##例

```cpp
#include <cmath>#include <iostream>int main() {  std::cout << std::fixed;  std::cout << "tanh(-1.0) = " << std::tanh(-1.0) << std::endl;  std::cout << "tanh(0.0)  = " << std::tanh(0.0) << std::endl;  std::cout << "tanh(1.0)  = " << std::tanh(1.0) << std::endl;}
```

###出力

```cpp
tanh(-1.0) = -0.761594tanh(0.0)  = 0.000000tanh(1.0)  = 0.761594
```

##バージョン


###言語


- C++03
- C++11



###処理系

- [Clang](/implementation#clang.md): 1.9, 2.9, 3.1
- [GCC](/implementation#gcc.md): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation#icc.md): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0<h4>備考</h4>
特定の環境で constexpr 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上



##実装例

tanh のマクローリン展開はベルヌーイ数が登場するため計算には向かない。
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/tanh/tanh_mac.png)


以下の公式から求めることができる。
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/tanh/tanh_formula.png)

