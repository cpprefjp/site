#デストラクタ
* ostream[meta header]
* std[meta namespace]
* basic_ostream::sentry[meta class]
* function[meta id-type]

```cpp
~sentry();
```

##概要
出力処理の後処理を行う。

##効果
`(os.`[`flags`](../../../ios/ios_base/flags.md)`() & unitbuf) && !`[`uncaught_exception`](../../../exception/uncaught_exception.md)`() && os.`[`good`](../../../ios/basic_ios/good.md)`()` が `true` なら、`os.`[`rdbuf`](../../../ios/basic_ios/rdbuf.md)`()->`[`pubsync`](../../../streambuf/basic_streambuf/pubsync.md.nolink)`()` を呼び出す。  
`os.`[`rdbuf`](../../../ios/basic_ios/rdbuf.md)`()->`[`pubsync`](../../../streambuf/basic_streambuf/pubsync.md.nolink)`()` が `-1` を返したら、`badbit` をセットする。ただし、これにより例外を投げることはない。

##参照
- [`(constructor)`](op_constructor.md)
- [`operator bool`](op_bool.md)
