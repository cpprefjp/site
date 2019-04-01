# deallocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
void deallocate(Tp* p, size_t n);
```

## 概要
指定されたメモリ領域を解放する。

## 要件
利用する`memory_resource`のポインタを`memory_rsrc`というメンバに保持しているとして  
`p`は、`(*memory_rsrc == x) == true`となるような`x`の`x.allocate(n * sizeof(Tp), alignof(Tp))`によって以前に確保された領域であること。

つまりは、同じオブジェクトであるか、同じメモリプールを共有しているような`memory_resource`のオブジェクトによって事前に確保された領域であること。

そして、そのメモリ領域は未解放であること。

## 引数
- `p` -- 解放する領域の先頭へのポインタ
- `n` -- 解放する領域の個数、バイト数ではなく配列の要素数相当

## 効果
利用する`memory_resource`のポインタを`memory_rsrc`というメンバに保持しているとすると、以下と等価である。  
`memory_rsrc->deallocate(p, n * sizeof(Tp), alignof(Tp));`

## 例外
投げない。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>

```
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

### 出力
```
equal
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`memory_resource::deallocate`](/reference/memory_resource/memory_resource/deallocate.md)
- [`allocator_traits<T>::deallocate`](/reference/memory/allocator_traits/deallocate.md)