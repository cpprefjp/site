#getloc
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
locale getloc();
```
* locale[link ../../locale/locale.md]

##概要
ロケールを取得する。


##戻り値
[`imbue`](imbue.md) で設定されたロケール。  
オブジェクトが構築されてから一度も [`imbue`](imbue.md) が呼び出されていない場合には、オブジェクトが構築された際のグローバル C++ ロケール（つまり、[`locale`](../../locale/locale.md)`()`）。


##備考
- 設定されたロケールは、ロケール依存の入出力に使用される。ただし、[`ios_base`](../ios_base.md) 自体にはロケール依存の入出力関数は存在しない。実際にロケール依存の入出力を行うのは、派生クラスである [`basic_istream`](../../istream/basic_istream.md) と [`basic_ostream`](../../ostream/basic_ostream.md)（および、それらの派生クラス [`basic_iostream`](../../istream/basic_iostream.md)）である。


##例
```cpp
#include <iostream>
#include <sstream>
#include <locale>

int main()
{
  std::stringstream ss;
  std::cout << ss.getloc().name() << std::endl;
  ss.imbue(std::locale(""));
  std::cout << ss.getloc().name() << std::endl;
}
```
* getloc()[color ff0000]
* std::locale[link ../../locale/locale.md]
* name()[link ../../locale/locale/name.md.nolink]
* imbue[link imbue.md]

###出力例
```
C
en_US.UTF-8
```

2 行目の出力は環境依存のため、上記の出力とは異なる可能性がある。  
しかし、グローバル C++ ロケールはプログラム実行開始時には "C" ロケールであるため、1 行目の出力は必ず上記のようになるはずである。


##バージョン
##言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [`ios_base`](../ios_base.md)`::`[`event`](type-event.md)
- [`ios_base`](../ios_base.md)`::`[`event_callback`](type-event_callback.md)
- [`ios_base`](../ios_base.md)`::`[`register_callback`](register_callback.md)
- [`ios_base`](../ios_base.md)`::`[`imbue`](imbue.md)
- [`basic_ios`](../basic_ios.md)`::`[`imbue`](../basic_ios/imbue.md)
- [`basic_streambuf`](../../streambuf/basic_streambuf.md)`::`[`getloc`](../../streambuf/basic_streambuf/getloc.md)
- [`basic_streambuf`](../../streambuf/basic_streambuf.md)`::`[`pubimbue`](../../streambuf/basic_streambuf/pubimbue.md)
- [`locale`](../../locale/locale.md)
