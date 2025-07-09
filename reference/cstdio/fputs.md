# fputs.md
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fputs(const char* str, FILE* stream);
}
```

## 概要
ファイルに渡された文字列を出力する。

## 戻り値
正常終了した場合は`0`を、そうでなければ[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  fputs("Hello, World!\n", stdout);
  return 0;
}
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??