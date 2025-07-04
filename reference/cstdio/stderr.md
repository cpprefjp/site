# stderr
* cstdio[meta header]
* std[meta namespace]
* macro[meta id-type]

```cpp
#define stderr /* implementation-defined */
```

## 概要
標準エラー出力を表す`*FILE`型のオブジェクト。

マクロとして定義されているため、std名前空間には存在しない。

## 例
```cpp example
#include <cstdio>

int main() {
  std::FILE* fp = stderr;
  std::fprintf(fp, "Hello, World!\n");
}
```
* stderr[color ff0000]
* std::fprintf[link /reference/cstdio/fprintf.md]

### 出力（標準エラー出力）
```
Hello, World!
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
