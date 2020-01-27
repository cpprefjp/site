# flush
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
basic_ostream<CharT, Traits>& flush();
```

## 概要
（非書式化出力関数）ストリームバッファをフラッシュする。

## 効果
1. [`rdbuf`](../../ios/basic_ios/rdbuf.md)`()` がヌルポインタであれば、何もしない。
1. [`sentry`](sentry.md) オブジェクトを構築する。[`sentry`](sentry.md) オブジェクトが失敗を示した場合、何もしない。
1. [`rdbuf`](../../ios/basic_ios/rdbuf.md)`()->`[`pubsync`](../../streambuf/basic_streambuf/pubsync.md.nolink)`()` を呼び出す。
1. [`pubsync`](../../streambuf/basic_streambuf/pubsync.md.nolink)`()` が `-1` を返した場合は、[`setstate`](../../ios/basic_ios/setstate.md)`(`[`badbit`](../../ios/ios_base/type-iostate.md)`)` を呼び出す。（それによって、例外 [`ios_base`](../../ios/ios_base.md)`::`[`failure`](../../ios/ios_base/failure.md) が送出されるかもしれない）
1. 上記処理�に例外が送出された場合、出力ストリームの現在の状態に [`ios_base`](../../ios/ios_base.md)`::`[`badbit`](../../ios/ios_base/type-iostate.md) を�定し、`(`[`exceptions`](../../ios/basic_ios/exceptions.md)`() &` [`ios_base`](../../ios/ios_base.md)`::`[`badbit`](../../ios/ios_base/type-iostate.md)`) != 0` の場合、当該例外を再送出する。

## 戻り値
`*this`

## 備考
本関数は、直接呼ぶのではなく、同名のマニピュレータ [`flush`](../flush.md)、あるいは改行を伴うマニピュレータ [`endl`](../endl.md) から間接的に呼び出されるのが一般的である。

## 例
```cpp example
#include <iostream>

int main() {
  std::cout << "cpprefjp";
  std::cout.flush();
  std::cout << "cpprefjp";
}
```
* flush()[color ff0000]

### 出力
```
cpprefjpcpprefjp
```

## 実装例
```cpp
template <class CharT, class Traits>
basic_ostream<CharT, Traits>& basic_ostream<CharT, Traits>::flush()
{
  if (this->rdbuf()) {
    try {
      sentry s(*this);
      if (s) {
        if (this->rdbuf()->pubsync() == pos_type(-1)) {
          this->setstate(ios_base::badbit);
        }
      }
    } catch (...) {
      // ここで、本ストリームの状態に ios_base::badbit を�定する（例外は投げない）
      if ((this->exceptions() & ios_base::badbit) != 0) {
        throw;
      }
    }
  }
  return *this;
}
```
* basic_ostream[link ../basic_ostream.md]
* rdbuf[link ../../ios/basic_ios/rdbuf.md]
* sentry[link sentry.md]
* pubsync[link ../../streambuf/basic_streambuf/pubsync.md.nolink]
* setstate[link ../../ios/basic_ios/setstate.md]
* exceptions[link ../../ios/basic_ios/exceptions.md]
* ios_base[link ../../ios/ios_base.md]
* badbit[link ../../ios/ios_base/type-iostate.md]

## バージョン
### 言語
- C++98

## 参照
- [`write`](write.md)
