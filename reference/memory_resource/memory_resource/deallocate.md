# deallocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
void deallocate(void* p, size_t bytes, size_t alignment = alignof(std::max_align_t));
```

## 概要
[`allocate`](allocate.md)によって確保されたメモリを解放する。

## 要件
`p`の指すサイズ`bytes`のメモリ領域は、`*this`もしくは等しい`memory_resource`オブジェクト（`this->is_equal(other) == true`となるような`other`）の[`allocate`](allocate.md)`(bytes, alignment)`によって事前に確保された領域であること。  
かつ、そのメモリ領域は未解放であること。

## 引数
- `p` -- 解放したい領域へのポインタ
- `bytes` -- `p`に確保されている領域のサイズ
- `alignment` -- `p`の確保時アライメント要求

## 効果
`return this->deallocate(p, bytes, alignment);` と等価。

## 例外
投げない

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
