# stdin
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define stdin /* implementation-defined */
```

## 概要
標準入力を表す`*FILE`型のオブジェクト。

マクロとして定義されているため、std名前空間には存在しない。

## 例
```cpp example
#include <cstdio>

int main() {
  int n;
  std::FILE* fp = stdin;
  std::FILE* fp2 = stdout;
  std::fscanf(fp, "%d", &n);
  std::fprintf(fp2, "%d\n", n);
}
```
* stdin[color ff0000]
* std::fprintf[link /reference/cstdio/fprintf.md]
* std::fscanf[link /reference/cstdio/fscanf.md]
* std::fprintf[link /reference/cstdio/fprintf.md]

### 入力
```
123
```

### 出力
```
123
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
