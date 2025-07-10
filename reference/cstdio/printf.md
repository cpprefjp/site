# fprintf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int printf(const char * format, ...);
}
```

## 概要
標準出力に、指定された書式文字列を使用してデータを出力する。

## 例
```cpp example
#include <cstdio>

int main() {
  int n = 123;
  std::printf("Hello, World!\n%d\n", n);
}
```
* std::printf[color ff0000]
### 出力
```
Hello, World!
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
