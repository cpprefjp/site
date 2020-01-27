# allocate_object
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp20[meta cpp]

```cpp
template <class T>
T* allocate_object(size_t n = 1);
```

## 概要

指定された個数の`T`型の配列として十分なメモリを確保する。

## 引数

- `n` -- 確保する領域の数、バイト数ではなく配列の要素数相当

## 効果

以下と�価。

```cpp
return static_cast<T*>(this->allocate_bytes(n*sizeof(T), alignof(T)));
```
* allocate_bytes[link allocate_bytes.md]

## 戻り値
確保した領域の先�へのポインタ。

## 例外

[`SIZE_MAX`](/reference/cstdint/size_max.md) `/ sizeof(T) < n`である場合、[`std::length_error`](/reference/stdexcept.md)例外を送出する

## 備考

型`T`は引数から推論することができないため、明示的に指定する必要がある。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main() {

  constexpr int N = 10;

  std::pmr::polymorphic_allocator<> alloc{};

  //int型10個分の領域を確保
  int* p = alloc.allocate_object<int>(N);

  //確保した領域にintのオブジェクトを構築
  for (int i = 0; i < N; ++i) {
    alloc.construct(p+i, i);
  }


  for (int i = 0; i < N; ++i) {
    std::cout << p[i] << "\n";
  }


  //領域上のオブジェクトを破棄
  for (int i = 0; i < N; ++i) {
    alloc.destroy(p+i);
  }

  //確保したメモリ領域を解放
  alloc.deallocate_object(p, N);
}
```
* allocate_object[color ff0000]
* construct[link construct.md]
* destroy[link destroy.md]
* deallocate_object[link deallocate_object.md]

### 出力
```
0
1
2
3
4
5
6
7
8
9
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [`allocate_bytes`](/reference/memory_resource/polymorphic_allocator/allocate_bytes.md)

## 参照
- [P0339R6 polymorphic_allocator<> as a vocabulary type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0339r6.pdf) 
