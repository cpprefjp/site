#defaultfloat
* ios[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  ios_base& defaultfloat(ios_base& str);
}
```

##概要
浮動小数点数を初期状態の書式で出力することを指示するマニピュレータ。

この書式は、出力値や出力すべき精度により小数点数表記と指数表記が切り替わるものである（[`printf()`](http://linuxjm.osdn.jp/html/LDP_man-pages/man3/printf.3.html)関数の`%g`／`%G`相当）。

##効果
`str.unsetf(ios_base::floatfield)`を実行する。

##戻り値
実引数の`str`オブジェクト。

##例
```cpp
#include <iostream>
#include <iomanip>

int main()
{
  std::cout << std::right;
  std::cout << std::setw(12) << "defaultfloat" << ' ';
  std::cout << std::setw(17) << "fixed" << ' ';
  std::cout << std::setw(15) << "scientific" << ' ';
  std::cout << std::setw(15) << "hexfloat" << std::endl;
  for (double i = 1e-6; i < 1e10; i *= 20) {
    std::cout << std::setw(12) << std::defaultfloat << i << ' ';
    std::cout << std::setw(17) << std::fixed << i << ' ';
    std::cout << std::setw(15) << std::scientific << i << ' ';
    std::cout << std::setw(15) << std::hexfloat << i << std::endl;
  }
}
```

###出力
```
defaultfloat             fixed      scientific        hexfloat
      1e-006          0.000001   1.000000e-006  0x1.0c6f7ap-20
      2e-005          0.000020   2.000000e-005  0x1.4f8b58p-16
      0.0004          0.000400   4.000000e-004  0x1.a36e2fp-12
       0.008          0.008000   8.000000e-003   0x1.0624ddp-7
        0.16          0.160000   1.600000e-001   0x1.47ae14p-3
         3.2          3.200000   3.200000e+000   0x1.99999ap+1
          64         64.000000   6.400000e+001   0x1.000000p+6
        1280       1280.000000   1.280000e+003  0x1.400000p+10
       25600      25600.000000   2.560000e+004  0x1.900000p+14
      512000     512000.000000   5.120000e+005  0x1.f40000p+18
  1.024e+007   10240000.000000   1.024000e+007  0x1.388000p+23
  2.048e+008  204800000.000000   2.048000e+008  0x1.86a000p+27
  4.096e+009 4096000000.000000   4.096000e+009  0x1.e84800p+31
```

##実装例
この実装はC++03の下でも可能である。
```cpp
namespace std {
  ios_base& defaultfloat(ios_base& str) {
    str.unsetf(ios_base::floatfield);
    return str;
  }
}
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC, C++11 mode](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0

##参照
- [`fixed`](fixed.md)
- [`scientific`](scientific.md)
- [`hexfloat`](hexfloat.md)
- [N1842 A Proposal to add two iostream manipulators to the C++ Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1842.pdf)
- [N1991 Proposed Text for defaultfloat (N1842)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1991.htm)
