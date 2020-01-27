# fegetround
* cfenv[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int fegetround();
}
```

## 概要
浮動小数点数の現在の丸め方式を取得する。


## 戻り値
現在�定されている浮動小数点数の丸め方式を返す。


## 例
```cpp example
#include <iostream>
#include <cfenv>

void print_round_mode(int round_mode)
{
  switch (round_mode) {
    case FE_DOWNWARD: std::cout << "downward" << std::endl; break;
    case FE_TONEAREST: std::cout << "to nearest" << std::endl; break;
    case FE_TOWARDZERO: std::cout << "toward zero" << std::endl; break;
    case FE_UPWARD: std::cout << "upward" << std::endl; break;
  }
}

int main()
{
  // デフォルト (FE_TONEAREST)
  print_round_mode(std::fegetround());

  // 切り下げに�定する
  std::fesetround(FE_DOWNWARD);
  print_round_mode(std::fegetround());
}
```
* std::fegetround[color ff0000]
* std::fesetround[link fesetround.md]
* FE_DOWNWARD[link fe_downward.md]
* FE_TONEAREST[link fe_tonearest.md]
* FE_TOWARDZERO[link fe_towardzero.md]
* FE_UPWARD[link fe_upward.md]

### 出力
```
to nearest
downward
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013, 2015
	- コンパイルオプション`/fp:strict`または`#pragma fenv_access (on)`が必要。さもなくば、�しく動作しないおそれがある。

