# unsetf
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
fmtflags unsetf(fmtflags mask);
```
* fmtflags[link type-fmtflags.md]

## 概要
書式フラグを解除する。


## 効果
[`flags`](flags.md)`()` から引数 `mask` をクリアする。[`flags`](flags.md)`(`[`flags`](flags.md)`() & ~mask)` と同等。


## 戻り値
解除される前の書式フラグ


## 備考
- 本関数は、単独のビットで意味のあるフィールド、および、複数ビットのいずれも設定されていないことに意味のあるフィールドに用いる。（例を参照）
    複数のビットで排他的に使用するフィールドには、本関数ではなく [`setf`](setf.md) の 2引数バージョンを使用する。
- 設定後に戻す必要が無いような場合には、本関数より各種マニピュレータを使用した方が便利だろう。


## 例
```cpp example
#include <iostream>

int main()
{
  // bool をアルファベット形式で出力
  std::cout.setf(std::ios_base::boolalpha);
  std::cout << true << '\n';

  // bool を非アルファベット形式（数値形式）で出力
  std::cout.unsetf(std::ios_base::boolalpha);
  std::cout << true << '\n';

  // 浮動小数点を科学表記で出力
  std::cout.setf(std::ios_base::scientific, std::ios_base::floatfield);
  std::cout << 123.456 << '\n';

  // 浮動小数点を固定表記で出力
  std::cout.setf(std::ios_base::fixed, std::ios_base::floatfield);
  std::cout << 123.456 << '\n';

  // 浮動小数点を標準の形式で出力
  std::cout.unsetf(std::ios_base::floatfield);
  std::cout << 123.456 << '\n';

  // マニピュレータを使用して上記と同等の設定をした例
  std::cout << std::boolalpha << true << '\n';
  std::cout << std::noboolalpha << true << '\n';
  std::cout << std::scientific << 123.456 << '\n';
  std::cout << std::fixed << 123.456 << '\n';
  std::cout << std::defaultfloat << 123.456 << '\n';    // C++11 から
}
```
* unsetf[color ff0000]
* setf[link setf.md]
* boolalpha[link type-fmtflags.md]
* scientific[link type-fmtflags.md]
* fixed[link type-fmtflags.md]
* floatfield[link type-fmtflags.md]
* std::noboolalpha[link ../noboolalpha.md]
* std::scientific[link ../scientific.md]
* std::fixed[link ../fixed.md]
* std::defaultfloat[link ../defaultfloat.md]
* std::ios_base[link ../ios_base.md]

### 出力例
```
true
1
1.234560e+02
123.456000
123.456
true
1
1.234560e+02
123.456000
123.456
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
- [`ios_base`](../ios_base.md)`::`[`fmtflags`](type-fmtflags.md)
- [`ios_base`](../ios_base.md)`::`[`flags`](flags.md)
- [`ios_base`](../ios_base.md)`::`[`setf`](setf.md)
