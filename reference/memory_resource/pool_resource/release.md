# release
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
void release();
```

## 概要

管理中の全てのメモリを解放する。

## 効果
必要に応じて[`this->upstream_resource()`](upstream_resource.md)[`->deallocate()`](/reference/memory_resource/memory_resource/deallocate.md)を呼び出し、内部のメモリプール及び上流メモリリソースから割り当てた全てのメモリを解放する。  
`deallocate()`によって割り当て解除されていないメモリがあったとしても、全てのメモリが解放される。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main() {

  std::pmr::synchronized_pool_resource mr{};

  //メモリを確保
  auto* p1 = mr.allocate(sizeof(int), alignof(int));
  auto* p2 = mr.allocate(sizeof(int), alignof(int));

  //解放せずにrelease
  mr.release();
  //以降、p1,p2の領域にアクセスしてはならない
}
```
* release[color ff0000]
* allocate[link /reference/memory_resource/memory_resource/allocate.md]
* synchronized_pool_resource[link /reference/memory_resource/pool_resource.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`memory_resource`](/reference/memory_resource/memory_resource.md)
- [`upstream_resource`](upstream_resource.md)