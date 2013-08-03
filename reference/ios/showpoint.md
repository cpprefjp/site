#showpoint
```cpp
namespace std {
  ios_base& showpoint(ios_base& str);
}
```

##概要
浮動小数点数出力時に小数点を必ず出力させることを指示するマニピュレータ。

##効果
`str.setf(std::ios_base::showpoint)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>
#include <iomanip>

int main()
{
  std::cout << std::showpoint;
  std::cout << std::setprecision(1) << 1. << ' ' << 1.e-10 << std::endl;
  std::cout << std::setprecision(2) << 1. << ' ' << 1.e-10 << std::endl;
}
```

###出力
```
1. 1.e-010
1.0 1.0e-010
```

##バージョン
###言語
- C++03

##参照
- [`noshowpoint`](./noshowpoint.md)
