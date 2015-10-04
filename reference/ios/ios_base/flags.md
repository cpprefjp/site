#flags
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
fmtflags flags() const;             // (1)
fmtflags flags(fmtflags fmtfl);     // (2)
```
* fmtflags[link type-fmtflags.md]

##概要
書式フラグを取得・設定する。


##効果
- (1) なし。
- (2) 書式フラグを引数 `fmtfl` に設定する。


##戻り値
- (1) 現在の書式フラグ
- (2) 設定される前の書式フラグ


##備考
(2) の形式ではすべての書式フラグの設定を行ってしまうため、特定の書式フラグを変更するのにはあまり向かないが、書式フラグを一時的に変更した後に元に戻す際には便利である。  
それ以外の用途では、一般的に [`setf`](setf.md)、[`unsetf`](unsetf.md.nolink) を使用したり、各種マニピュレータを使用する方が便利である。


##例
```cpp
#include <iostream>

int main()
{
  std::cout << 100 << '\n';

  // 16 進数に設定して出力
  std::ios_base::fmtflags old1 = std::cout.flags();
  std::cout.flags((old1 & ~std::ios_base::basefield) | std::ios_base::hex);
  std::cout << 100 << '\n';

  // 基数を元に戻して出力
  std::cout.flags(old1);
  std::cout << 100 << '\n';

  // 16 進数に設定して出力（setf を使用）
  std::ios_base::fmtflags old2 = std::cout.setf(std::ios_base::hex, std::ios_base::basefield);
  std::cout << 100 << '\n';

  // 基数を元に戻して出力
  std::cout.flags(old2);
  std::cout << 100 << '\n';

  // 16 進数に設定して出力（マニピュレータを使用）
  std::ios_base::fmtflags old3 = std::cout.flags();
  std::cout << std::hex << 100 << '\n';

  // 基数を元に戻して出力
  std::cout.flags(old3);
  std::cout << 100 << '\n';
}
```
* iostream[link ../../iostream.md]
* cout[link ../../iostream/cout.md]
* flags[color ff0000]
* fmtflags[link type-fmtflags.md]
* setf[link setf.md]
* hex[link type-fmtflags.md]
* std::hex[link ../hex.md]

###出力
```
64
100
64
100
64
100
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
- [`ios_base`](../ios_base.md)`::`[`fmtflags`](type-fmtflags.md)
- [`ios_base`](../ios_base.md)`::`[`setf`](setf.md)
- [`ios_base`](../ios_base.md)`::`[`unsetf`](unsetf.md.nolink)
