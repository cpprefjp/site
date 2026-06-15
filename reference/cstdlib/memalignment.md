# memalignment
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  size_t memalignment(const void* p);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
ポインタのアライメントを取得する。

C23で`<stdlib.h>`に追加された関数であり、C++26で`<cstdlib>`に取り込まれた。

この関数はフリースタンディング環境でも提供される。


## 戻り値
- `p`がヌルポインタでない場合、ポインタ値`p`を割り切ることができる最大の2の累乗の値を返す
- `p`がヌルポインタの場合、`0`を返す


## 例
```cpp example
#include <cstdlib>
#include <print>

int main()
{
  void* p = std::aligned_alloc(64, 256);
  std::println("{}", std::memalignment(p));
  std::free(p);
}
```
* std::memalignment[color ff0000]
* std::aligned_alloc[link aligned_alloc.md]

### 出力例
```
64
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`aligned_alloc()`](aligned_alloc.md): 指定したアライメントでメモリを確保する
- [`free_aligned_sized()`](free_aligned_sized.md): アライメントと確保時のサイズを指定して、確保したメモリを解放する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<cstdlib>`に追加された
