# getc
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
int getc(FILE* stream);
```

## 概要
ストリームから一文字読み取る。

関数でもマクロでも定義してよいため、引数が一度しか評価されない保証はない。

## 戻り値
読み取る文字があればその文字を、なければ[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  int c;
  while ((c = getc(stdin)) != EOF) {
    putc(c, stdout);
  }
}
```
* getc[color ff0000]
* putc[link /reference/cstdio/putc.md]

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
