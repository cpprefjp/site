# putc
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int putc(int c, FILE* stream);
}
```

## 概要
指定されたストリームに1文字出力する。

## 戻り値
成功したら書き込んだ文字を、失敗すれば[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  std::putc('H', stdout);
  std::putc('e', stdout);
  std::putc('l', stdout);
  std::putc('l', stdout);
  std::putc('o', stdout);
  std::putc('\n', stdout);
}
```
* std::putc[color ff0000]
* stdout[link /reference/cstdio/stdout.md]

### 出力
```
Hello
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
