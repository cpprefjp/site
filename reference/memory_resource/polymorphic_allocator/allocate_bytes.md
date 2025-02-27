# allocate_bytes
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp20[meta cpp]

```cpp
[[nodiscard]]
void* allocate_bytes(size_t nbytes,
                     size_t alignment = alignof(max_align_t)); // (1) C++20
void* allocate_bytes(size_t nbytes,
                     size_t alignment = alignof(max_align_t)); // (1) C++26
```
* max_align_t[link /reference/cstddef/max_align_t.md]

## 概要

指定されたバイト数とアライメントでメモリを確保する。

## 事前条件

`alignment`は2の累乗であること。

## 引数

- `nbytes` -- 確保したい領域のサイズ（バイト数）
- `alignment` --  確保領域へのアライメント要求


## 効果

利用する[`memory_resource`](/reference/memory_resource/memory_resource.md)のポインタを`memory_rsrc`というメンバに保持しているとすると、以下と等価。

```cpp
return memory_rsrc->allocate(nbytes, alignment);
```
* allocate[link /reference/memory_resource/memory_resource/allocate.md]

## 戻り値

確保した領域の先頭へのポインタ。

## 例外

要求されたアライメントでサイズ`nbytes`のメモリを確保できない場合、例外が送出される。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main() {
  constexpr int N = 10;

  std::pmr::polymorphic_allocator<> alloc{};

  //int型10個分の領域をデフォルトアライメントで確保
  void* vp = alloc.allocate_bytes(sizeof(int) * N, alignof(int));

  //確保したメモリ領域へのポインタを所望の型のものにキャスト
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
  alloc.deallocate_bytes(vp, sizeof(int) * N, alignof(int));
}
```
* allocate_bytes[color ff0000]
* construct[link construct.md]
* destroy[link destroy.md]
* deallocate_bytes[link deallocate_bytes.md]

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
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 9 [mark verified]

## 関連項目
- [`memory_resource::allocate`](/reference/memory_resource/memory_resource/allocate.md)

## 参照
- [P0339R6 polymorphic_allocator<> as a vocabulary type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0339r6.pdf) 
- [LWG Issue 3304. Allocate functions of `std::polymorphic_allocator` should require `[[nodiscard]]`](https://wg21.cmeerw.net/lwg/issue3304)
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
