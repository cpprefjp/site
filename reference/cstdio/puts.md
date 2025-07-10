# puts
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int puts(const char* str);
}
```

## 概要
引数に渡されたヌル終端文字列を標準出力に出力する。

また、末尾には自動で改行がつく。

## 戻り値
成功すれば[`EOF`](/reference/cstdio/eof.md)以外の値を返し、失敗すれば[`EOF`](/reference/cstdio/eof.md)を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  std::puts("Hello, World!");
}
```
* std::puts[color ff0000]

### 出力
```
Hello, World!
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
