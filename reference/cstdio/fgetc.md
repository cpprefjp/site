# fgetc
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fgetc( FILE* stream );
}
```

## 概要
指定されたファイルストリームから1文字入力する。

[`getc`](/reference/cstdio/getc.md)とは違い、関数として定義することが定められているため、引数は一度しか評価されないことが保証されている。

## 戻り値
入力された文字を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  int c;
  while ((c = std::fgetc(stdin)) != EOF) {
    std::putc(c, stdout);
  }
}
```
* std::fgetc[color ff0000]
* std::putc[link /reference/cstdio/putc.md]

### 入力
```
abc
```

### 出力
```
abc
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
