# scanf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int scanf(const char * format, ...);
}
```

## 概要
標準入力から、指定された書式文字列を使用してデータを入力する。

## 例
```cpp example
#include <cstdio>

int main() {
  int n;
  std::scanf("%d", &n);
  std::printf("%d\n", n);
}
```
* std::scanf[color ff0000]
* std::printf[link /reference/cstdio/printf.md]
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
