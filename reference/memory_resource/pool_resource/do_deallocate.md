# do_deallocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
void do_deallocate(void* p, std::size_t bytes, std::size_t alignment) override;
```

## 概要
[`do_allocate`](do_allocate.md)によって割り当てたメモリ領域を解放（割り当て解除）する。

要件�は[`memory_resource::do_deallocate()`](/reference/memory_resource/memory_resource/do_deallocate.md)に従う。

## 要件
`p`の指すサイズ`bytes`のメモリ領域は、[`this->do_allocate`](do_allocate.md)`(bytes, alignment)`によって事前に確保された領域であること。  
かつ、そのメモリ領域は未解放であること。

## 引数
- `p` -- 解放する領域へのポインタ
- `bytes` -- `p`の領域のサイズ
- `alignment` -- `p`割り当て時のアライメント要求

## 効果
指定されたメモリ領域を内部プールへ返却する。  
ただし、[`this->upstream_resource()`](upstream_resource.md)[`->deallocate()`](/reference/memory_resource/memory_resource/deallocate.md)が呼ばれるかどうか、またはどのような状況で[`this->upstream_resource()`](upstream_resource.md)[`->deallocate()`](/reference/memory_resource/memory_resource/deallocate.md)が呼ばれるかは未規定。


## 例外
投げない。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`pool_options`](/reference/memory_resource/pool_options.md)
- [`memory_resource`](/reference/memory_resource/memory_resource.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
