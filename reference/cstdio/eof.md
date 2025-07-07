# EOF
* cstdio[meta header]
* std[meta namespace]
* macro[meta id-type]

```cpp
#define EOF /* implementation defined */
```

## 概要
ファイルの終端であることを表すマクロ。

型は`int`であり、負であることが保証されている。

## 例
```cpp example
#include <cstdio>
int main() {
  int c;
  while ((c = getchar()) != EOF) {
    putchar(c);
  }
  if (c == EOF)
    puts("REACHED END");
}

```
* EOF[color ff0000]
* getchar[link /reference/cstdio/getchar.md.nolink]
* putchar[link /reference/cstdio/putchar.md.nolink]
* puts[link /reference/cstdio/puts.md.nolink]

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

