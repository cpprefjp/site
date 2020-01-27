# init
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
protected:
  void init(basic_streambuf<CharT, Traits>* sb);
```
* basic_streambuf[link ../../streambuf/basic_streambuf.md]


## 概要
`*this` を初期化する。


## 効果
`*this` の状態を以下の表のようになるよう�定する。

| 要素 | 値 |
|------|----|
| [`rdbuf`](rdbuf.md)`()` | `sb` |
| [`tie`](tie.md)`()` | `0` |
| [`rdstate`](rdstate.md)`()` | `sb` がヌルポインタでなければ [`goodbit`](../ios_base/type-iostate.md)、そうでなければ [`badbit`](../ios_base/type-iostate.md) |
| [`exceptions`](exceptions.md)`()` | [`goodbit`](../ios_base/type-iostate.md) |
| [`flags`](../ios_base/flags.md)`()` | [`skipws`](../ios_base/type-fmtflags.md)<code> &#x7c; </code>[`dec`](../ios_base/type-fmtflags.md) |
| [`width`](../ios_base/width.md)`()` | `0` |
| [`precision`](../ios_base/precision.md)`()` | `6` |
| [`fill`](fill.md)`()` | [`widen`](widen.md)`(' ')` |
| [`getloc`](../ios_base/getloc.md)`()` | [`locale`](../../locale/locale/op_constructor.md)`()` のコピー |
| [`iword`](../ios_base/iword.md)`()` で使用される私用記憶域 | なし |
| [`pword`](../ios_base/pword.md)`()` で使用される私用記憶域 | なし |


## 戻り値
無し


## バージョン
### 言語
- C++98


## 参照
- [`basic_ios`](../basic_ios.md)`::`[`basic_ios`](op_constructor.md)
- [`basic_ios`](../basic_ios.md)`::`[`~basic_ios`](op_destructor.md)
- [`ios_base`](../ios_base.md)`::`[`ios_base`](../ios_base/op_constructor.md)
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](../ios_base/op_destructor.md)
