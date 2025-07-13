# EOF
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define EOF /* implementation-defined */
```

## 概要
ファイルの終端であることを表すマクロ。

型は`int`であり、負であることが保証されている。

## 例
```cpp example
#include <cstdio>

int main() {
  int c;
  while ((c = std::getchar()) != EOF) {
    std::putchar(c);
  }
  if (c == EOF)
    std::puts("REACHED END");
}

```
* EOF[color ff0000]
* std::getchar[link /reference/cstdio/getchar.md]
* std::putchar[link /reference/cstdio/putchar.md]
* std::puts[link /reference/cstdio/puts.md]

### 入力
```
aa
```

### 出力
```
aa
REACHED END
```


## 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
