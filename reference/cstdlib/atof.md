# atof
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  double atof( const char* str );
}
```

## 概要

`str`を`float`に変換する。

## 変換方法

- 空白文字から始まる場合、最初の非空白文字から変換する。
- `0x` または `0X` の場合、空白でない16進数として処理する。
- `e`または`E`は、それより前を基数、その後ろを指数として処理する。
- \+ 、\-は変換後の符号に適用される。
- `INF`または`INFINITY`(大小文字区別せず)は`inf`を返す。
- NAN(大小文字区別せず)はそれ以前の数値を返す。もし以前の数値がないなら、`nan`を返す。


## 戻り値

変換可能ならば変換後の数値。

変換後の数値が`float`の範囲外なら、その動作は未定義である。

変換不能なら`0.0`を返す。


## 例

```cpp example
#include <cstdlib>
#include <iostream>
 
int main()
{
  std::cout << std::atof("0.0000000123") << '\n'
            << std::atof("0.012") << '\n'
            << std::atof("15e16") << '\n'
            << std::atof("-0x1afp-2") << '\n'
            << std::atof("inF") << '\n'
            << std::atof("12Nan23") << '\n'
            << std::atof("NAN") << '\n'
            << std::atof("invalid") << '\n';
}
```

## 出力例

```
1.23e-08
0.012
1.5e+17
-107.75
inf
12
nan
0
```
