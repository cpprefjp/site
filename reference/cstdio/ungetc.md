# ungetc
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int ungetc(int c, FILE *stream);
}
```

## 概要
符号なしの文字`c`を入力ストリーム`stream`に戻す。

この関数は、連続してこの関数が呼び出される場合、入力ストリームへのプッシュ・バックを保証できる連続した文字は 1 つのみである。

また、`c`は[`EOF`](/reference/cstdio/eof.md)であってはならない。

この関数が呼び出されたのち、[`fseek`](/reference/cstdio/fseek.md.nolink)や[`fsetpos`](/reference/cstdio/fsetpos.md)、[`rewind`](/reference/cstdio/rewind.md.nolink)、[`fflush`](/reference/cstdio/fflush.md)を呼び出すと、その関数の呼び出しによって戻された文字は失われる。

## 戻り値
成功したら挿入した`c`を、そうでなければ[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  std::putchar(std::getchar());
  std::ungetc('A', stdin);
  std::putchar(std::getchar());
}
```
* std::ungetc[color ff0000]
* std::getchar[link /reference/cstdio/getchar.md]
* std::putchar[link /reference/cstdio/putchar.md]

### 入力
```
a
```

### 出力
```
aA
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
