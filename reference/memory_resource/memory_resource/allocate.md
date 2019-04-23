# allocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
void* allocate(size_t bytes, size_t alignment = alignof(std::max_align_t));
```

## 概要
メモリを確保する。

## 要件
`alignment`は2のべき乗であること。

## 引数
- `bytes` -- 確保したい領域のサイズ
- `alignment` -- 確保領域に期待するアライメント要求。指定されたアライメントを満たせない場合は`alignof(std::max_align_t)`にアラインされる。

## 効果
`return this->do_allocate(bytes, alignment);` と等価。  

## 戻り値
少なくともサイズ`bytes`のメモリを確保した領域へのポインタ。  
`alignment`にアラインすることができない（処理系でサポートされない）場合、`alignof(std::max_align_t)`にアラインされる。

## 例外
要求されたアライメントでサイズ`bytes`のメモリを確保できない場合、例外が送出される。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>

```
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

### 出力
```
equal
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6
