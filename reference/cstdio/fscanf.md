# fscanf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
int fscanf( FILE* restrict stream, const char* restrict format, ... );
```

## 概要
指定されたファイルストリームから、指定された書式文字列を使用してデータを入力する。

## 例
```cpp example
#include <cstdio>

int main() {
  int n;
  const char* path = "test.txt";
  std::FILE* fp = std::fopen(path, "r");
  std::fscanf(fp, "%d", &n);
  std::fclose(fp);
  std::printf("%d\n", n);
}
```
* std::fscanf[color ff0000]
* std::fopen[link /reference/cstdio/fopen.md]
* std::fclose[link /reference/cstdio/fclose.md]
* std::FILE[link /reference/cstdio/file.md]
### 出力(test.txtは以下参照)
```
123
```

### ファイル内容(test.txt)
```
123
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
