#put
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
basic_ostream<CharT, Traits>& write(const char_type* s, streamsize n);
```

##概要
（非書式化出力関数）ストリームへ文字を出力する。

##効果
1. [`sentry`](sentry.md) オブジェクトを構築する。[`sentry`](sentry.md) オブジェクトが失敗を示した場合、何もしない。
1. `c` をストリームバッファへ出力する。
1. 出力できなかったら、[`setstate`](../../ios/basic_ios/setstate.md)`(badbit)` を呼び出す。

##戻り値
`*this`

##例
```cpp
#include <iostream>

int main() {
  std::cout.put('1');
  std::cout.put('\n');
}
```
* put[color ff0000]
* iostream[link ../../iostream.md]
* cout[link ../../iostream/cout.md]

###出力
```
1
```

##実装例
TBD

##バージョン
###言語
- C++98

##参照
- [`write`](write.md)
