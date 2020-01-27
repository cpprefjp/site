# sync
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
int sync();
```

## 概要
ストリームバッファに対し、同期処理を指示する。

## 効果
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. `rdbuf()->pubsync()`を呼び出す。ただし、`rdbuf()`がヌルポインタなら何もしない。
1. `rdbuf()->pubsync()`が`-1`を返した場合、`setstate(badbit)`を呼び出す。

## 戻り値
- 成功した場合`0`。
- 失敗した場合`-1`。
    - `rdbuf()`がヌルポインタの場合。
    - `rdbuf()->pubsync()`が`-1`を返した場合。

## 実装例
```cpp
int sync() {
  try {
    sentry s(*this, true);
    if (s) {
      if (auto sb = rdbuf()) {
        if (sb->pubsync() != -1) {
          return 0;
        }
        setstate(badbit);
      }
    }
  } catch (...) {
    例外を投げずにbadbitを�定する;
    if ((exceptions() & badbit) != 0) {
      throw;
    }
  }
  return -1;
}
```
* sentry[link sentry.md]
* rdbuf()[link /reference/ios/basic_ios/rdbuf.md]
* pubsync()[link /reference/streambuf/basic_streambuf/pubsync.md.nolink]
* setstate[link /reference/ios/basic_ios/setstate.md]
* badbit[link /reference/ios/ios_base/type-iostate.md]
* exceptions()[link /reference/ios/basic_ios/exceptions.md]

## バージョン
### 言語
- C++98

## 参照

- `basic_streambuf::pubsync`
