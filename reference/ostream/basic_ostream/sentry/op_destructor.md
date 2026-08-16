# デストラクタ
* ostream[meta header]
* std[meta namespace]
* basic_ostream::sentry[meta class]
* function[meta id-type]

```cpp
~sentry();
```

## 概要
出力処理の後処理を行う。

## 効果
`(os.`[`flags`](../../../ios/ios_base/flags.md)`() & unitbuf) && !`[`uncaught_exception`](../../../exception/uncaught_exception.md)`() && os.`[`good`](../../../ios/basic_ios/good.md)`()` が `true` なら、`os.`[`rdbuf`](../../../ios/basic_ios/rdbuf.md)`()->`[`pubsync`](../../../streambuf/basic_streambuf/pubsync.md)`()` を呼び出す。  
`os.`[`rdbuf`](../../../ios/basic_ios/rdbuf.md)`()->`[`pubsync`](../../../streambuf/basic_streambuf/pubsync.md)`()` が `-1` を返す、または例外を送出して終了した場合、`badbit` を設定する。ただし、これにより例外が伝播することはない。

## 参照
- [`(constructor)`](op_constructor.md)
- [`operator bool`](op_bool.md)
- [LWG Issue 4188. `ostream::sentry` destructor should handle exceptions](https://cplusplus.github.io/LWG/issue4188)
    - C++26で、`pubsync()`が例外を送出して終了した場合も`badbit`を設定し、例外を伝播しないことが明確化された
