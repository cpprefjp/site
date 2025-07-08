# realloc
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void* realloc(void* ptr, size_t new_size);
}
```

## 概要
確保済みの領域`ptr`を`new_size`に再確保する。

`ptr`は、`calloc`、`malloc`、`realloc`で事前に確保され、なおかつ`free`で解放されていないメモリである必要がある。

それ以外のメモリの場合、動作は未定義。

`ptr`に`nullptr`を渡した場合、`malloc(new_size)`として動作する。

## 効果
メモリの確保は次のいずれかの方法で行われる。

  - 既存のメモリを拡張、縮小する。

    縮小した場合、再確保されたメモリのサイズまでの領域の内容が保持される。

    拡張した場合、新しい領域の内容は未規定。

  - 新しいサイズの領域を確保、割り当てする。その後、新しいサイズと古いサイズのいずれか小さい方のサイズに等しいメモリ領域をコピーし、古いブロックを解放する。

  - メモリが不足している場合、`nullpte`が返される。

## 備考
`new_size`が0の場合の動作は定義されていない。

## 戻り値
再確保できた場合、その領域の先頭のポインタを返す。

なお、その領域はメモリリークを避けるため、`free`、`realloc`で解放する必要がある。

失敗した場合、`nullptr`を返す。もとのポインタは有効なままで、解放する必要がある。

## 例
```cpp example
#include <cstdlib>
#include <iostream>

int main() {
  // 初期サイズでメモリを確保
  int* p = static_cast<int*>(std::malloc(5 * sizeof(int)));
  if (!p) return 1;
  for (int i = 0; i < 5; ++i) {
    p[i] = i;
  }
  // サイズを再確保（拡張）
  int* q = static_cast<int*>(std::realloc(p, 10 * sizeof(int)));
  if (!q) {
    std::free(p);
    std::cerr << "realloc failed" << std::endl;
    return 1;
  }// 拡張後の内容を出力（追加領域の値は未定義）
  for (int i = 0; i < 10; ++i) {
    std::cout << q[i] << ' ';
  }
  std::cout << std::endl;
  std::free(q);
}
```
## 出力例
```
0 1 2 3 4 0 0 0 0 0
```


## 関連項目
- [`calloc`](calloc.md): メモリを確保する
- [`malloc`](malloc.md): メモリを確保し、領域をゼロ初期化する
- [`free`](free.md): 確保したメモリを解放する
