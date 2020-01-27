# cout
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern ostream cout;
  extern wostream wcout;
}
```
* ostream[link ../ostream/basic_ostream.md]
* wostream[link ../ostream/basic_ostream.md]

## 概要
`cout`も`wcout`も、標準出力に対する出力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stdout`オブジェクトに結びつけられているストリームバッファに出力する。

`cout`は`character output`を意味する。また`wcout`は`wide character output`を意味する。<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>

## 例
```cpp example
#include <iostream>

int main()
{
  std::cout << "Hello world" << std::endl;
}
```
* std::cout[color ff0000]

### 出力
```
Hello world
```

## バージョン
### 言語
- C++98

### 備考

`wcout`は規格上実装しなければならないが、実装されていなかったり、期待どおりに動作しない事がある。

#### localeの�定
望む出力を得るためにlocaleを再�定しなければならない場合がある。

例えばVisual Studioでは

```cpp example
#include <iostream>

int main()
{
  std::wcout.imbue(std::locale(""));
  //std::wcout.imbue(std::locale("ja"));
  //std::wcout.imbue(std::locale("japanese"));
  std::wcout << L"ありきたりな世界" << std::endl;
}
```
* std::wcout[color ff0000]
* imbue[link /reference/ios/basic_ios/imbue.md]

のようにして�定しないと何も表示されない。

`std::locale("")`とすると本来はOSに�定された�ケールが�定されるはずが、MinGWやLinux環境で実行すると、"C"�ケールになってしまう問題がある。

また、上記プ�グラムで`std::locale("ja")`の行のコメントアウトを外してを実行すると、以下のようなエラーが出力されてしまう。

```
terminate called after throwing an instance of 'std::runtime_error'
  what():  locale::facet::_S_create_c_locale name not valid

Aborted
```

一方、以下のようなコードなら求める結果が得られる処理系もある。

```cpp example
#include <iostream>

int main()
{
  std::ios_base::sync_with_stdio(false);
  std::locale default_loc("");
  std::locale::global(default_loc);
  std::locale ctype_default(std::locale::classic(), default_loc, std::locale::ctype); //※
  std::wcout.imbue(ctype_default);
  std::wcout << L"ありきたりな世界" << std::endl;
}
```
* std::wcout[color ff0000]
* imbue[link /reference/ios/basic_ios/imbue.md]

このように求める結果を得るためのlocaleの�定は処理系によって大きく異なる。

#### 端末の�ケールなど

`wcout`自体はUnicodeを扱うが、結局`stdout`に出力するので、その標準出力を受け取って表示する端末の�ケールやフォントなどの�定も考える必要がある。

##### Windows
Windowsではコマンドプ�ンプトのデフォルトの�ケールがUTF-8(65001)ではない事が多い(日本語利用者なら932になっている事が多い)ため、その�ケールで対応していないUnicodeコードポイントは当然変換できないので文�化けする。

またWindows10 1709より前では、`chcp 65001`などでUTF-8にしたときのフォントの指定に制約があり、実質日本語を表示することは不可能だった。

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[Stroustrup: C++ Style and Technique FAQ](http://www.stroustrup.com/bs_faq2.html#cout)</cite>(2018-08-21 17:01 JST 閲覧)

## 参照

- [使用できる�ケール文�列](../../article/platform/locales.md)
- [標準出力に書き込む | 株式会社きじ�こ](http://www.kijineko.co.jp/tech/cppsamples/stdout.html)
- [c++で日本語の処理（�ケール周り） 7/8追記 - nullnull7の日記](http://nullnull.hatenablog.com/entry/20120629/1340935277)
- [std::locale constructor modifies global locale via "setlocale()" | Microsoft Connect](http://web.archive.org/web/20100328154628/http://connect.microsoft.com:80/VisualStudio/feedback/details/492128/std-locale-constructor-modifies-global-locale-via-setlocale)
