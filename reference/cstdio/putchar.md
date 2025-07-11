# putchar
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
int putchar(int c);
```

## 概要
標準出力に1文字出力する。

これは、[`putc`](/reference/cstdio/putc.md)(`c`, [`stdout`](/reference/cstdio/stdout.md))と等価である。

## 戻り値
成功すれば書き込んだ文字を、失敗すれば[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  putchar('H');
  putchar('e');
  putchar('l');
  putchar('l');
  putchar('o');
  putchar('\n');
}
```
* putchar[color ff0000]

### 出力
```
Hello
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
