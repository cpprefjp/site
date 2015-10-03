#imbue
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
locale imbue(const locale& loc);
```
* locale[link ../../locale/locale.md]

##概要
ロケールを設定する。


##効果
`*this` で使用するロケールを引数 `loc` に設定した後、[`register_callback`](register_callback.md) で登録されたペア `(fn, index)` を `(*fn)(`[`imbue_event`](type-event.md)`, *this, index)` として呼び出す。


##戻り値
[`getloc`](getloc.md.nolink)`()` の以前の値


##備考
- 呼び出されたコールバック関数の内部で [`getloc`](getloc.md.nolink)`()` を呼び出した場合、新たに設定されたロケール（つまり引数 `loc` で指定されたロケール）が返される。
- 設定されたロケールは、ロケール依存の入出力に使用される。ただし、[`ios_base`](../ios_base.md) 自体にはロケール依存の入出力関数は存在しない。実際にロケール依存の入出力を行うのは、派生クラスである [`basic_istream`](../../istream/basic_istream.md) と [`basic_ostream`](../../ostream/basic_ostream.md)（および、それらの派生クラス [`basic_iostream`](../../istream/basic_iostream.md)）である。


##例
```cpp
#include <iostream>
#include <locale>

int main()
{
  std::cout.imbue(std::locale::classic());
  std::cout << 1234.5 << std::endl;
  std::cout.imbue(std::locale("en_US"));
  std::cout << 1234.5 << std::endl;
  std::cout.imbue(std::locale("de_DE"));
  std::cout << 1234.5 << std::endl;
}
```
* iostream[link ../../iostream.md]
* locale[link ../../locale.md]
* classic[link ../../locale/classic.md.nolink]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* imbue[color ff0000]

###出力例
```
1234.5
1,234.5
1.234,5
```

なお、ロケールの名称（ここでは `en_US` と `de_DE`）は環境依存のため、上記の例は動作しないこともある。  
その場合でも、ロケールの名称を当該環境で適切なものに変更すれば動作するはずである。  
また、最初の行（`C` ロケール）以外の出力はロケール依存のため、たとえこれらのロケールが使用できたとしても上記のようには出力されない可能性もある（が、一般的にはこのように出力される）。


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
- [`ios_base`](../ios_base.md)`::`[`getloc`](getloc.md.nolink)
