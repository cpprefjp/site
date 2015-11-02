#コンストラクタ
* istream[meta header]
* std[meta namespace]
* basic_istream::sentry[meta class]
* function[meta id-type]

```cpp
explicit sentry(basic_istream& is, bool noskipws = false);
```
* char_traits[link ../../../string/char_traits.md]
* basic_istream[link ../../basic_istream.md]

##概要
入力処理の前処理を行う。

##効果
1. `is.`[`good`](../../../ios/basic_ios/good.md)`()`が`false`なら、`is.`[`setstate`](../../../ios/basic_ios/setstate.md)`(failbit)`を呼び出し、関数から帰る。
1. `is.`[`tie`](../../../ios/basic_ios/tie.md)`()`が非ヌルポインタなら、`is.`[`tie`](../../../ios/basic_ios/tie.md)`()->`[`flush`](../../../ostream/basic_ostream/flush.md)`()`を呼び出す。
    - `is.`[`tie`](../../../ios/basic_ios/tie.md)`()`が指す先のストリームバッファのput areaが空なら、この処理を省略しても良い。
    - `is.`[`rdbuf`](../../../ios/basic_ios/rdbuf.md)`()->`[`underflow`](../../../streambuf/basic_streambuf/underflow.md.nolink)`()`の呼び出しが発生するまで、この処理を遅延させても良い。
    - `is.`[`rdbuf`](../../../ios/basic_ios/rdbuf.md)`()->`[`underflow`](../../../streambuf/basic_streambuf/underflow.md.nolink)`()`の呼び出しが発生しなかったら、この処理を省略して良い（標準ライブラリ実装内部で、そのような最適化を行っても良い）。
1. `noskipws`が`false`かつ`is.`[`flags`](../../../ios/ios_base/flags.md)`() &` [`ios_base`](../../../ios/ios_base.md)`::skipws`が真なら、ストリームから空白文字を読み捨てる。
    - 空白文字の判定は、文字`c`について[`use_facet`](../../../locale/use_facet.md.nolink)`<`[`ctype`](../../../locale/ctype.md)`<CharT>>(is.`[`getloc`](../../../ios/ios_base/getloc.md)`()).`[`is`](../../../locale/ctype/is.md.nolink)`(`[`ctype`](../../../locale/ctype.md)`::`[`space`](../../../locale/ctype_base.md)`, c)`と等価な方法で行う。
    - このとき`is.`[`rdbuf`](../../../ios/basic_ios/rdbuf.md)`()->`[`sbumpc`](../../../streambuf/basic_streambuf/sbumpc.md.nolink)`()`または`is.`[`rdbuf`](../../../ios/basic_ios/rdbuf.md)`()->`[`sgetc`](../../../streambuf/basic_streambuf/sgetc.md.nolink)`()`が`Traits::eof()`を返したら、`is.`[`setstate`](../../../ios/basic_ios/setstate.md)`(failbit | eofbit)`を呼び出す。

ここまでの手順が完了したら、このオブジェクトの`operator bool`関数は`true`を、さもなくば`false`を返すようになる。
