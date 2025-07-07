# free
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void free(void* ptr) noexcept;
}
```

## 概要
`malloc`、`calloc`、`aligned_alloc`、`realloc`で確保されたメモリ領域を解放する。

解放済みのポインタを再度 `free` に渡したり、アクセスしたりすると未定義動作となる。

ポインタが`nullptr`の場合、この関数は何も実行しない。

解放されたポインタに再びアクセスする場合、未定義動作を引き起こす恐れがある。

## 備考
この関数はスレッドセーフである。

## 実装例
```cpp example
int main(void)
{
  int *p1 = malloc(10*sizeof *p1);
  free(p1); // p1のメモリを解放

  int *p2 = calloc(10, sizeof *p2);
  int *p3 = realloc(p2, 1000*sizeof *p3);
  if(p3) 
    free(p3); // realloc により新しい領域が確保された場合、それを解放
  else
    free(p2); // realloc が失敗した場合は元の領域を解放
}
```
### 出力結果
```

```

## 関連項目
- [`aligned_alloc`](aligned_alloc.md):指定したアライメントでメモリを確保する
- [`malloc`](malloc.md):メモリを確保する
- [`calloc`](calloc.md):メモリを確保する(0で初期化する)
- [`realloc`](realloc.md.nolink):メモリを再確保する
