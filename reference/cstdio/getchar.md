# getchar
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int getchar();
}
```

## 概要
標準入力から1文字入力する。

[`getc`](/reference/cstdio/getc.md)とは違い、関数として定義することが定められているため、引数は一度しか評価されないことが保証されている。

また、[`getc`](/reference/cstdio/getc.md)([`stdin`](/reference/cstdio/stdin.md))と等価である。

## 戻り値
読み取る文字があればその文字を、なければ[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>
int main() {
  int c;
  while ((c = std::getchar()) != EOF) {
    std::putchar(c);
  }
}
```
* std::getchar[color ff0000]
* std::putchar[link /reference/cstdio/putchar.md]
* EOF[link /reference/cstdio/eof.md]

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
