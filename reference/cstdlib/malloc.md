# malloc

- cstdlib[meta header]
- std[meta namespace]
- function[meta id-type]

## 概要

```cpp
void *malloc( size_t size );
```

初期化されていない`size_t`個の`size`型配列のメモリを確保する。

確保可能なら、配列の初めのポインタを返す。

確保不可能なら、`null`を返す。

確保するサイズが 0 の時に`malloc`が返す値は、定義されていない。

具体的には、`null`ポインタが返される場合もある。

また、`null`以外のポインタが返された場合もあり、この場合はメモリリークを避けるため参照を解除せずに`free`関数に渡すべきである。

この関数でできた、オブジェクトの寿命は、メモリ割り当て時から、 `free`などで解放されるまでである。

## 備考

この関数はスレッドセーフである。

メモリリークを避けるため、この関数で確保したメモリは、`free`などを使い、メモリ解放するべきである。

## 例

cppref より引用。

```cpp example
#include <iostream>
#include <cstdlib>

int main(void)
{
    int *p1 = malloc(4*sizeof(int));  // 4個のint型配列の目盛りを確保
    int *p2 = malloc(sizeof(int[4])); // 上と同じ。
    int *p3 = malloc(4*sizeof *p3);   // 上と同じ。

    if(p1) {
        for(int n=0; n<4; ++n)
            p1[n] = n*n;
        for(int n=0; n<4; ++n)
            printf("p1[%d] == %d\n", n, p1[n]);
    }

    free(p1);//メモリを開放
    free(p2);
    free(p3);
}
```

## 出力例

```
p1[0] == 0
p1[1] == 1
p1[2] == 4
p1[3] == 9
```

## 関連リンク

- [`free`](/cstdlib/free.md.nolink): 確保したメモリを解放する。

## 参照

- [7.22.3 Memory management functions](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf)
