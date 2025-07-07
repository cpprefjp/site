# calloc

* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
void *calloc(size_t nmemb, size_t size);
```

## 概要

任意の個数のオブジェクトへの配列用ポインタを動的に確保し、その領域を 0 で初期化する。

この関数で返されるポインタは、割当領域の先頭のポインタである。

領域が割り当てられない場合は、[`nullptr`](/lang/cpp11/nullptr.md)を返す。

割り当てられたオブジェクトの寿命は、このメモリが割り当てられてられた時から、[`free`](free.md.nolink)などで解放されるまでである。

この関数は、静的ストレージにはアクセスしない、スレッドセーフである。

## 備考

- `calloc`、`malloc`および `realloc`関数による連続的なメモリ確保によるメモリの割当の順序、連続性は不定である。

- 目盛りリークを避けるため、この関数で確保したメモリは、`free`などを使い、メモリ解放するべきである。

## 例

```cpp example
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
  int* p1 = calloc(4, sizeof(int));    // 4個のint配列のポインタを確保、0二初期化
  int* p2 = calloc(1, sizeof(int[4])); // 上と同じ
  int* p3 = calloc(4, sizeof *p3);     // 上と同じ

  if (p2)
  {
    for (int n = 0; n < 4; ++n)
      printf("p2[%d] == %d\n", n, p2[n]);
  }

  free(p1);
  free(p2);
  free(p3);
}
```

## 出力例

```
p2[0] == 0
p2[1] == 0
p2[2] == 0
p2[3] == 0
```

## 関連項目

- `free`:確保されたメモリを解放する。

## 参照

-[7.20.3 Memory management functions]("https://www.dii.uchile.cl/~daespino/files/Iso_C_1999_definition.pdf")
