# fill
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
char_type fill() const;                 // (1)

char_type fill(char_type fillch);       // (2)
```
* basic_ios[link ../basic_ios.md]

## 概要
埋め文字を取得・設定する。


## 効果
- (1) -
- (2) 書式化出力の際に、設定されたフィールド幅にするために使用される埋め文字を、引数 `fillch` に設定する。


## 戻り値
- (1) 書式化出力の際に、設定されたフィールド幅にするために使用される埋め文字。
- (2) 設定される前の埋め文字。


## 備考
- 設定後に戻す必要が無いような場合には、本関数よりマニピュレータ（[`setfill`](../../iomanip/setfill.md.nolink)`()`）を使用した方が便利だろう。
- 埋め文字が使用される位置は、出力されるデータの型、[`ios_base`](../ios_base.md)`::`[`adjustfield`](../ios_base/type-fmtflags.md) の設定に依存する。  
    [`ios_base`](../ios_base.md)`::`[`adjustfield`](../ios_base/type-fmtflags.md) が [`ios_base`](../ios_base.md)`::`[`left`](../ios_base/type-fmtflags.md)、および、[`ios_base`](../ios_base.md)`::`[`right`](../ios_base/type-fmtflags.md) の場合には、型によらずそれぞれ値の右側、および、左側に出力される。  
    [`ios_base`](../ios_base.md)`::`[`adjustfield`](../ios_base/type-fmtflags.md) が [`ios_base`](../ios_base.md)`::`[`internal`](../ios_base/type-fmtflags.md) の場合、ほとんどの型では [`ios_base`](../ios_base.md)`::`[`right`](../ios_base/type-fmtflags.md) の場合と同様、値の左側に出力されるが、数値型の場合、符号・あるいは基数表示と数値の間に出力される。


## 例
```cpp example
#include <iostream>
#include <iomanip>

int main()
{
  char fillch = std::cout.fill('0');
  std::cout.width(5);
  std::cout << 10 << '\n';
  std::cout.fill(fillch);

  // マニピュレータを使った例
  std::cout << std::setfill('*') << std::setw(10) << 10 << '\n';
}
```
* fill[color ff0000]
* std::setw[link ../../iomanip/setw.md.nolink]
* std::setfill[link ../../iomanip/setfill.md.nolink]
* width[link ../ios_base/width.md]

### 出力
```
00010
********10
```



## バージョン
### 言語
- C++98

## 参照
- [`setfill`](../../iomanip/setfill.md.nolink)
- [`setw`](../../iomanip/setw.md.nolink)
- [`left`](../left.md)
- [`right`](../right.md)
- [`internal`](../internal.md)
- [`ios_base`](../ios_base.md)`::`[`width`](../ios_base/width.md)
- [`ios_base`](../ios_base.md)`::`[`precision`](../ios_base/precision.md)
- [`ios_base`](../ios_base.md)`::`[`setf`](../ios_base/setf.md)
- [`ios_base`](../ios_base.md)`::`[`unsetf`](../ios_base/unsetf.md)
- [`ios_base`](../ios_base.md)`::`[`flags`](../ios_base/flags.md)
- [`ios_base`](../ios_base.md)`::`[`adjustfield`](../ios_base/type-fmtflags.md)
- [`ios_base`](../ios_base.md)`::`[`left`](../ios_base/type-fmtflags.md)
- [`ios_base`](../ios_base.md)`::`[`right`](../ios_base/type-fmtflags.md)
- [`ios_base`](../ios_base.md)`::`[`internal`](../ios_base/type-fmtflags.md)
