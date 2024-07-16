# deallocate_object
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp20[meta cpp]

```cpp
template <class T>
void deallocate_object(T* p, size_t n = 1);
```

## 概要
指定された個数の`T`のメモリ領域を解放する。

## 事前条件

`p`の指す`n`個のメモリ領域は以前に`*this`の確保関数のいずれかによって確保された領域であること。  
かつ、そのメモリ領域は未解放であること。

## 引数
- `p` -- 解放したい領域へのポインタ
- `n` -- `p`に確保されている`T`のオブジェクトの要素数

## 効果

```cpp
this->deallocate_bytes(p, n*sizeof(T), alignof(T));
```
* deallocate_bytes[link deallocate_bytes.md]

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
* deallocate_object[color ff0000]
* construct[link construct.md]
* destroy[link destroy.md]
* allocate_object[link allocate_object.md]

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
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 9 [mark verified]

## 関連項目
- [`deallocate_bytes`](/reference/memory_resource/polymorphic_allocator/deallocate_bytes.md)

## 参照
- [P0339R6 polymorphic_allocator<> as a vocabulary type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0339r6.pdf) 
