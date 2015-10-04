#width
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
streamsize width(); const                       // (1)
streamsize width(streamsize wide);              // (2)
```
* streamsize[link ../type-streamsize.md]

##概要
フィールドの幅を取得・設定する。


##効果
- (1) なし。
- (2) フィールドの幅を、引数 `wide` に設定する。


##戻り値
- (1) 現在のフィールドの幅
- (2) 設定される前のフィールドの幅


##備考
他のフラグや [`precision`](precision.md) 等と異なり、フィールドの幅は次の書式化出力の後にリセットされるため、本関数よりマニピュレータ（[`setw`](../../iomanip/setw.md.nolink)`()`）を使用した方が便利だろう。


##例
```cpp
#include <iostream>
#include <iomanip>

int main()
{
  const char* s = "0123456";

  std::cout.width(11);
  std::cout << s << '\n';
  std::cout << s << '\n';

  // setprecision を使った例
  std::cout << std::setw(8) << s << '\n';
  std::cout << s << '\n';
}
```
* iostream[link ../../iostream.md]
* iomanip[link ../../iomanip.md]
* cout[link ../../iostream/cout.md]
* streamsize[link ../type-streamsize.md]
* width[color ff0000]
* setw[link ../../iomanip/setw.md.nolink]

###出力例
```
    0123456
0123456
 0123456
0123456
```


##バージョン
##言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [`ios_base`](../ios_base.md)`::`[`precision`](precision.md)
- [`setprecision`](../../iomanip/setprecision.md.nolink)
- [`setw`](../../iomanip/setw.md.nolink)
