# fopen
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  FILE* fopen(const char* filename, const char* mode);
}
```

## 概要
ファイルを開く。

`mode`にはファイルのモードを指定する。

## 戻り値
正常に実行されれば、ファイルストリームを返す。

ファイルの開き方に失敗した場合、`NULL`を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  std::FILE *fp = std::fopen("test.txt", "w");
  if (fp == NULL) {
    std::printf("ファイルを開けませんでした\n");
    return 1;
  }
  std::fclose(fp);
  return 0;
}
```
* std::fopen[color ff0000]
* std::fclose[link /reference/cstdio/fclose.md]
* std::FILE[link /reference/cstdio/file.md]
* std::printf[link /reference/cstdio/printf.md]

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
