# deallocate_bytes
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp20[meta cpp]

```cpp
void deallocate_bytes(void* p, size_t nbytes, size_t alignment = alignof(max_align_t));
```
* max_align_t[link /reference/cstddef/max_align_t.md]

## 概要

指定されたバイト数、アライメントで確保されているメモリ領域を解放する。

## 事前条件

`p`の指すサイズ`bytes`のメモリ領域は以前に`*this`の確保関数のいずれかによって確保された領域であること。  
かつ、そのメモリ領域は未解放であること。

## 引数

- `p` -- 解放したい領域へのポインタ
- `nbytes` -- `p`に確保されている領域のサイズ
- `alignment` --  `p`の確保時アライメント要求

## 効果

利用する`memory_resource`のポインタを`memory_rsrc`というメンバに保持しているとすると、以下と�価。

```cpp
memory_rsrc->deallocate(p, nbytes, alignment);
```
* deallocate[link /reference/memory_resource/memory_resource/deallocate.md]

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main() {
  constexpr int N = 10;

  std::pmr::polymorphic_allocator<> alloc{};

  //int型10個分の領域をデフォルトアライメントで確保
  void* vp = alloc.allocate_bytes(sizeof(int) * N, alignof(int));

  //確保したメモリ領域へのポインタを所望の型のものに�ャスト
  int* p = static_cast<int*>(vp);

  //確保したメモリ領域にintのオブジェクトを構築（コンストラクタ呼び出し）
  for (int i = 0; i < N; ++i) {
    alloc.construct(p+i, i);
  }


  std::cout << "address : " << vp << std::endl;

  for (int i = 0; i < N; ++i) {
    std::cout << p[i] << "\n";
  }


  //領域上のオブジェクトを破棄（デストラクタ呼び出し）
  for (int i = 0; i < N; ++i) {
    alloc.destroy(p+i);
  }

  //確保したメモリ領域を解放
  alloc.deallocate_bytes(vp, N, alignof(int));
}
```
* deallocate_bytes[color ff0000]
* construct[link construct.md]
* destroy[link destroy.md]
* allocate_bytes[link allocate_bytes.md]

### 出力例（GCC9.2）
```
address : 0x1c38150
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
- [`memory_resource::deallocate`](/reference/memory_resource/memory_resource/deallocate.md)

## 参照
- [P0339R6 polymorphic_allocator<> as a vocabulary type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0339r6.pdf) 
