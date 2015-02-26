#noshowpoint
* ios[meta header]

```cpp
namespace std {
  ios_base& noshowpoint(ios_base& str);
}
```

##概要
浮動小数点数出力時に小数点を不要なら出力させないことを指示するマニピュレータ。

##効果
`str.unsetf(std::ios_base::showpoint)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>
#include <iomanip>

int main()
{
  std::cout << std::showpoint << std::setprecision(1);
  std::cout << 1. << ' ' << 1.e+100 << std::endl;
  std::cout << std::noshowpoint;
  std::cout << 1. << ' ' << 1.e+100 << std::endl;
}
```

###出力
```
1. 1.e+100
1 1e+100
```

##バージョン
###言語
- C++03

##参照
- [`showpoint`](./showpoint.md)
