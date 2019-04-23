# do_deallocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
void do_deallocate(void* p, size_t bytes, size_t alignment) override;
```

## 概要
[`do_allocate`](do_allocate.md)によって割り当てたメモリ領域を解放（割り当て解除）する。

要件等は[`memory_resource::do_deallocate()`](/reference/memory_resource/memory_resource/do_deallocate.md)に従う。

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
すなわち、上流メモリリソースから直接取得したメモリはこの関数では解放されない可能性がある。


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