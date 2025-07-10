# calloc

* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void *calloc(size_t nmemb, size_t size);
}
```

## 概要

任意の個数のオブジェクトへの配列用ポインタを動的に確保し、その領域を 0 で初期化する。

この関数で返されるポインタは、割当領域の先頭のポインタである。

領域の確保に失敗した場合は、[`nullptr`](/lang/cpp11/nullptr.md)を返す。

割り当てられたオブジェクトの寿命は、このメモリが割り当てられた時から、[`free`](free.md)などで解放されるまでである。

この関数は、静的ストレージにはアクセスせず、スレッドセーフである。

## 備考

- `calloc`・`malloc`・`realloc` によって複数個の異なる領域が確保された場合、それらの連続性や順序は保証されない。
- メモリリークを避けるため、この関数で確保したメモリは、`free`などを使い、メモリ解放するべきである。

## 例

```cpp example
#include <cstdio>
#include <cstdlib>

int main()
{
  int* p1 = calloc(4, sizeof(int));    // 4個のint配列のポインタを確保、0に初期化
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

- [`free`](free.md):確保されたメモリを解放する。

## 参照

- C99: 7.20.3 Memory management functions
