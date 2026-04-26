# cout
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern ostream cout;
}
```
* ostream[link ../ostream/basic_ostream.md]
* ostream[link ../ostream/basic_ostream.md]

## 概要
`cout`は、標準出力に対する出力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stdout`オブジェクトに結びつけられているストリームバッファに出力する。

`cout`は`character output`を意味する。

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

## 関連項目

- [`wcout`](wcout.md)

## 参照

- [使用できるロケール文字列](../../article/platform/locales.md)
- [標準出力に書き込む | 株式会社きじねこ](https://web.archive.org/web/20191011112040/http://www.kijineko.co.jp/tech/cppsamples/stdout.html)
- [c++で日本語の処理（ロケール周り） 7/8追記 - nullnull7の日記](http://nullnull.hatenablog.com/entry/20120629/1340935277)
- [std::locale constructor modifies global locale via "setlocale()" | Microsoft Connect](http://web.archive.org/web/20100328154628/http://connect.microsoft.com:80/VisualStudio/feedback/details/492128/std-locale-constructor-modifies-global-locale-via-setlocale)
- [ASCII.jp：Windows 10に“まとも”に使えるコンソール「WindowsTerminal」が登場する (2/2)](https://ascii.jp/elem/000/001/868/1868623/2/)
