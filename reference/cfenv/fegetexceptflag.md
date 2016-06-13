#fegetexceptflag
* cfenv[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int fegetexceptflag(fexcept_t *flagp, int excepts);
}
```
* fexcept_t[link fexcept_t.md]

##概要
浮動小数点例外の現在の状態を、実装定義の表現で取得する。

この関数は、現在発生している浮動小数点例外のうち、指定された例外の集合のみを抽出して、実装定義の表現に変換して返す。


##効果
ビット演算のORで複数指定された浮動小数点例外の種類`excepts`の例外発生状態を、実装定義の表現に変換して`flagp`に書き込んで返す。


##戻り値
実装定義の表現への変換および書き込みに成功したら`0`、そうでなければ`0`以外の値を返す。


##例
```cpp
// 標準C++の浮動小数点例外を、
// Visual C++での浮動小数点例外の形式に変換する
#include <iostream>
#include <cfenv>

int main()
{
  float a = 1.0f;
  float b = 0.0f;
  float result = a / b;

  std::fexcept_t excepts = 0;
  std::fegetexceptflag(&excepts, FE_ALL_EXCEPT);

  if (excepts & _SW_ZERODIVIDE)
  {
    std::cout << "zero divided" << std::endl;
  }
}
```
* std::fegetexceptflag[color ff0000]
* fexcept_t[link fexcept_t.md]
* FE_ALL_EXCEPT[link fe_all_except.md]

##出力例
```
zero divided
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 12.0


