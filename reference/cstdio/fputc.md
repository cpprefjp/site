# fputc
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fputc( int ch, FILE* stream );
}
```

## 概要
指定されたファイルストリームに1文字出力する。

[`putc`][/reference/cstdio/putc.md.nolink]とは違い、関数として定義することが定められているため、引数は一度しか評価されないことが保証されている。

## 戻り値
出力された文字を返す。

失敗した場合、[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  fputc('a', stdout);
}
```
* fputc[color ff0000]
* stdout[link /reference/cstdio/stdout.md]

### 出力
```
a
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
