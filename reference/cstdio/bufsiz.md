# BUFSIZ
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define BUFSIZ implementation-defined
```

## 概要
標準入出力のバッファサイズを表すマクロ。

このマクロは、標準入出力関数で使用されるデフォルトのバッファサイズを定義する。値は実装依存であるが、一般的には512バイトや1024バイトなどの値が使用される。

## 例
```cpp example
#include <cstdio>
#include <iostream>

int main() {
  // BUFSIZの値を表示
  std::printf("BUFSIZ = %d\n", BUFSIZ);
  
  // バッファサイズを指定してファイルを開く
  char buffer[BUFSIZ];
  std::FILE* file = std::fopen("test.txt", "w");
  if (file) {
    // バッファを設定
    std::setbuf(file, buffer);
    std::fprintf(file, "Hello, World!\n");
    std::fclose(file);
  }
  
  return 0;
}
```
* BUFSIZ[color ff0000]
* std::printf[link /reference/cstdio/printf.md]
* std::fopen[link /reference/cstdio/fopen.md]
* std::setbuf[link /reference/cstdio/setbuf.md.nolink]
* std::fprintf[link /reference/cstdio/fprintf.md]
* std::fclose[link /reference/cstdio/fclose.md]

### 出力例
```
BUFSIZ = 1024
```

## 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
