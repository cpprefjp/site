# allocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
Tp* allocate(size_t n);
```

## 概要
指定された分のメモリ領域を確保する

## 引数
- `n` -- 確保する領域の数、バイト数ではなく配列の要素数相当

## 効果
利用する`memory_resource`のポインタを`memory_rsrc`というメンバに保持しているとすると、以下と等価である。  
`return static_cast<Tp*>(memory_rsrc->allocate(n * sizeof(Tp), alignof(Tp)));`

## 戻り値
確保した領域の先頭へのポインタ。

## 例外
指定されたサイズの領域が確保できない場合は例外を送出する。

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
- [`memory_resource::allocate`](/reference/memory_resource/memory_resource/allocate.md)
- [`allocator_traits<T>::allocate`](/reference/memory/allocator_traits/allocate.md)