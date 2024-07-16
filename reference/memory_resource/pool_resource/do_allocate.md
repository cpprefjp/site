# do_allocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
void* do_allocate(std::size_t bytes, std::size_t alignment) override;
```

## 概要
要求されたサイズおよびアライメントでメモリを割り当てる。

割り当てられた領域のサイズと配置・要件等は[`memory_resource::do_allocate()`](/reference/memory_resource/memory_resource/do_allocate.md)に従う。

## 事前条件
`alignment`は2の累乗であること

## 引数

- `bytes` -- 割り当てるメモリのサイズ
- `alignment` -- 割り当てる領域へのアライメント要求

## 効果
`bytes`以上で最小のブロックサイズの内部メモリプールからメモリを割り当てる。  
そのようなブロックサイズのプールが枯渇している場合、上流メモリリソースからプールを補充しメモリ割り当てを行う。  
プールの補充はチャンク単位で行われ、補充の度にチャンクサイズは増加する。その上限はコンストラクタで渡した[`pool_options::max_blocks_per_chunk`](/reference/memory_resource/pool_options.md)か、実装定義の最大値が設定される。

また、`bytes`が設定されている最大のブロックサイズを超える場合は上流メモリリソースから直接メモリを割り当てる。

少なくとも`bytes`のメモリを割り当て、`alignment`にアラインする。

## 戻り値
割り当てた領域の先頭へのポインタ

## 例外
[`this->upstream_resource()`](upstream_resource.md)[`->allocate()`](/reference/memory_resource/memory_resource/allocate.md)が例外を投げないのならば、この関数も例外を投げない。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`memory_resource`](/reference/memory_resource/memory_resource.md)
- [`pool_options`](/reference/memory_resource/pool_options.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
- [LWG Issue 2843. Unclear behavior of `std::pmr::memory_resource::do_allocate()`](https://wg21.cmeerw.net/lwg/issue2843)
