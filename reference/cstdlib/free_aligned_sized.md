# free_aligned_sized
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  void free_aligned_sized(void* ptr, size_t alignment, size_t size);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
アライメントと確保時のサイズを指定して、確保したメモリを解放する。

C23で`<stdlib.h>`に追加された関数であり、C++26で`<cstdlib>`に取り込まれた。


## 事前条件
- `ptr`がヌルポインタであるか、もしくは[`aligned_alloc()`](aligned_alloc.md)が返したポインタであること
- `ptr`がヌルポインタでない場合、`alignment`はそのメモリの確保時に指定したアライメントと等しく、`size`は確保時に要求したサイズと等しいこと


## 効果
- `ptr`がヌルポインタの場合、なにもしない
- そうでない場合、[`free()`](free.md)`(ptr)`と等価である


## 戻り値
なし


## 備考
- この関数はスレッドセーフである
- アライメントと確保時のサイズを処理系に渡せるため、[`free()`](free.md)よりも効率的に解放できる可能性がある


## 例
```cpp example
#include <cstdlib>

int main()
{
  // 64バイトアライメントで、256バイトの領域を確保する
  void* p = std::aligned_alloc(64, 256);
  std::free_aligned_sized(p, 64, 256);
}
```
* std::free_aligned_sized[color ff0000]
* std::aligned_alloc[link aligned_alloc.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`free()`](free.md): 確保したメモリを解放する
- [`free_sized()`](free_sized.md): 確保時のサイズを指定して、確保したメモリを解放する
- [`aligned_alloc()`](aligned_alloc.md): 指定したアライメントでメモリを確保する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<cstdlib>`に追加された
