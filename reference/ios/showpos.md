#showpos
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& showpos(ios_base& str);
}
```

##概要
数値出力時に符号を必ず出力させることを指示するマニピュレータ。
符号付き整数・浮動小数点数に対して効果がある。

##効果
`str.setf(std::ios_base::showpos)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
```cpp
#include <iostream>

int main()
{
  std::cout << std::showpos << 1 << ' ' << 0 << std::endl;
}
```

###出力
```
+1 +0
```

##バージョン
###言語
- C++03

##参照
- [`noshowpos`](noshowpos.md)
