# putc
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
int putc(int c, FILE* stream);
```

## 概要
指定されたストリームに1文字出力する。

## 戻り値
成功したら書き込んだ文字を、失敗すれば[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  putc('H', stdout);
  putc('e', stdout);
  putc('l', stdout);
  putc('l', stdout);
  putc('o', stdout);
  putc('\n', stdout);
}
```
* putc[color ff0000]
* stdout[link /reference/cstdio/stdout.md]

### 出力
```
Hello
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??