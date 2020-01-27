# write
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
basic_ostream<CharT, Traits>& write(const char_type* s, streamsize n);
```

## 概要
（非書式化出力関数）ストリームへ文�の並びを出力する。

## 効果
1. [`sentry`](sentry.md) オブジェクトを構築する。[`sentry`](sentry.md) オブジェクトが失敗を示した場合、何もしない。
1. 配列要素へのポインタ `s` から `n` 文�をストリームバッファへ出力する。
1. 出力できなかったら、[`setstate`](../../ios/basic_ios/setstate.md)`(badbit)` を呼び出す。

## 戻り値
`*this`

## 例
```cpp example
#include <iostream>
#include <cstring>

int main() {
  const char* s = "Hello world\n";
  std::cout.write(s, static_cast<std::streamsize>(std::strlen(s)));
}
```
* write[color ff0000]

### 出力
```
Hello world
```

## 実装例
TBD

## バージョン
### 言語
- C++98

## 参照
- [`put`](put.md)
