# precision
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
streamsize presision(); const                       // (1)
streamsize presision(streamsize prec);              // (2)
```
* streamsize[link ../type-streamsize.md]

## 概要
浮動小数点数の精度を取得・設定する。


## 効果
- (1) なし。
- (2) 浮動小数点数の精度を、引数 `prec` に設定する。


## 戻り値
- (1) 現在の浮動小数点数の精度
- (2) 設定される前の浮動小数点数の精度


## 備考
- 浮動小数点の精度は、浮動小数点をストリームに出力する際に使用されるが、その意味は浮動小数点の出力形式によって異なる。  
    通常表記の場合出力される有効数字の最大数、科学表記の場合出力される有効数字の数、固定表記の場合出力される小数点以下の数字の数を表す。  
    なお、C++11 から導入された 16 進浮動小数点表記の場合は使用されない（無視される）。
- 設定後に戻す必要が無いような場合には、本関数よりマニピュレータ（[`setprecision()`](../../iomanip/setprecision.md)）を使用した方が便利だろう。


## 例
```cpp
#include <iostream>
#include <iomanip>

int main()
{
  const double f = 9876.54321123456789;

  std::streamsize old = std::cout.precision(11);
  std::cout << std::scientific << f << '\n';
  std::cout << std::fixed << f << '\n';
  std::cout << std::defaultfloat << f << '\n';          // C++11 から
  std::cout << std::hexfloat << f << '\n';              // C++11 から
  std::cout.precision(old);

  // setprecision を使った例
  std::cout << std::setprecision(8) << std::scientific << f << '\n';
}
```
* precision[color ff0000]
* std::streamsize[link ../type-streamsize.md]
* std::defaultfloat[link ../defaultfloat.md]
* std::scientific[link ../scientific.md]
* std::fixed[link ../fixed.md]
* std::hexfloat[link ../hexfloat.md]
* std::setprecision[link ../../iomanip/setprecision.md]

### 出力例
```
9.87654321123e+03
9876.54321123457
9876.5432112
0x1.34a4587f21ba5p+13
9.87654321e+03
```


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`ios_base`](../ios_base.md)`::`[`width`](width.md)
- [`setprecision`](../../iomanip/setprecision.md)
- [`setw`](../../iomanip/setw.md.nolink)
