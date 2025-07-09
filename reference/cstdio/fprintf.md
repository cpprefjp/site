# fprintf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fprintf( FILE* restrict stream, const char* restrict format, ... );
}
```

## 概要
指定されたファイルストリームに、指定された書式文字列を使用してデータを出力する。

## 例
```cpp example
#include <cstdio>

int main() {
  int n = 123;
  std::fprintf(stdout, "Hello, World!\n%d\n", n);
  const char* path = "test.txt";
  std::FILE* fp = std::fopen(path, "w");
  std::fprintf(fp, "Hello, World!\n%d\n", n);
  std::fclose(fp);
}
```
* std::fprintf[color ff0000]
* std::fopen[link /reference/cstdio/fopen.md]
* std::fclose[link /reference/cstdio/fclose.md]
* std::FILE[link /reference/cstdio/file.md]
### 出力
```
Hello, World!
123
```

### ファイル出力(test.txt)
```
Hello, World!
123
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
