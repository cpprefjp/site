# deallocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
void deallocate(Tp* p, std::size_t n);
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
#include <memory_resource>

int main()
{
  std::pmr::polymorphic_allocator<int> alloc{};

  //メモリの確保
  int* array = alloc.allocate(4);

  //要素を構築
  for (int i = 0; i < 4; ++i) {
    alloc.construct(array + i, i);
  }

  for (int i = 0; i < 4; ++i) {
    std::cout << array[i] << std::endl;
  }

  //要素を破棄
  for (int i = 0; i < 4; ++i) {
    alloc.destroy(array + i);
  }

  //メモリの解放
  alloc.deallocate(array, 4);
}
```
* deallocate[color ff0000]
* allocate[link allocate.md]
* construct[link construct.md]
* destroy[link destroy.md]

### 出力
```
0
1
2
3
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`memory_resource::deallocate`](/reference/memory_resource/memory_resource/deallocate.md)
- [`allocator_traits<T>::deallocate`](/reference/memory/allocator_traits/deallocate.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
