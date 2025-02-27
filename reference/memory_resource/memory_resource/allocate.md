# allocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
void* allocate(size_t bytes, size_t alignment = alignof(max_align_t)); // (1) C++17
[[nodiscard]]
void* allocate(size_t bytes, size_t alignment = alignof(max_align_t)); // (1) C++20
void* allocate(size_t bytes, size_t alignment = alignof(max_align_t)); // (1) C++26
```
* size_t[link /reference/cstddef/size_t.md]
* max_align_t[link /reference/cstddef/max_align_t.md]

## 概要

指定されたバイト数とアライメントでメモリを確保する。

## 事前条件
呼び出す`do_allocate`の要件として  
`alignment`は2の累乗であること。

## 引数
- `bytes` -- 確保したい領域のサイズ（バイト数）
- `alignment` -- 確保領域へのアライメント要求

## 効果
`return this->do_allocate(bytes, alignment);` と等価。  
少なくとも`bytes`のメモリを確保し、`alignment`にアラインする。

## 戻り値
確保したメモリ領域の先頭ポインタ。

## 例外
要求されたアライメントでサイズ`bytes`のメモリを確保できない場合、例外が送出される。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main(){
  std::pmr::memory_resource* mr = std::pmr::get_default_resource();
  //int1つ分の領域をintのアライメント要求（多くの環境で共に4バイト）でメモリ確保
  void* p = mr->allocate(sizeof(int), alignof(int));
  //placement new して構築
  int* p_int = new(p) int{ 256 };

  std::cout << *p_int << std::endl;
  //一応アドレスを出力
  std::cout << p << std::endl;
  std::cout << p_int << std::endl;

  //デストラクタを呼び出してオブジェクトを破棄
  std::destroy_at(p_int);

  //メモリの解放
  mr->deallocate(p, sizeof(int), alignof(int));
}
```
* allocate[color ff0000]
* get_default_resource[link /reference/memory_resource/get_default_resource.md]
* deallocate[link /reference/memory_resource/memory_resource/deallocate.md]
* std::destroy_at[link /reference/memory/destroy_at.md]

### 出力例（VS2019 Preview2）
```
256
000002373BB96970
000002373BB96970
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
- [P0600R1 `[[nodiscard]]` in the Library, Rev1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [LWG Issue 2843. Unclear behavior of `std::pmr::memory_resource::do_allocate()`](https://wg21.cmeerw.net/lwg/issue2843) 
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
