# allocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
Tp* allocate(std::size_t n);               // (1) C++17
[[nodiscard]] Tp* allocate(std::size_t n); // (1) C++20
```

## 概要
指定された分のメモリ領域を確保する

## 引数
- `n` -- 確保する領域の数、バイト数ではなく配列の要素数相当

## 効果
利用する`memory_resource`のポインタを`memory_rsrc`というメンバに保持しているとすると、以下と�価である。

```cpp
return static_cast<Tp*>(memory_rsrc->allocate(n * sizeof(Tp), alignof(Tp)));
```

## 戻り値
確保した領域の先�へのポインタ。

## 例外
- [`SIZE_MAX`](/reference/cstdint/size_max.md) `/ sizeof(Tp) < n`である場合、[`std::length_error`](/reference/stdexcept.md)例外を送出する
- 指定されたサイズの領域が確保できない場合は、任意の例外を送出する

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
* allocate[color ff0000]
* construct[link construct.md]
* destroy[link destroy.md]
* deallocate[link deallocate.md]

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
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`memory_resource::allocate`](/reference/memory_resource/memory_resource/allocate.md)
- [`allocator_traits<T>::allocate`](/reference/memory/allocator_traits/allocate.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
- [P0600R1 `[[nodiscard]]` in the Library, Rev1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
- [LWG Issue 3038. `polymorphic_allocator::allocate` should not allow integer overflow to create vulnerabilities](https://wg21.cmeerw.net/lwg/issue3038)
