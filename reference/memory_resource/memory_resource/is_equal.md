# is_equal
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
bool is_equal(const memory_resource& other) const noexcept;
```

## 概要
今のオブジェクト（`this`）で確保（[`allocate`](allocate.md)）したメモリ領域が、`other`によって解放（[`deallocate`](deallocate.md)）でき、その逆も可能かをチェックする。

## 引数
- `other` -- チェックする`memory_resource`オブジェクト

## 効果
`return this->do_is_equal(other);` と等価。

## 戻り値
`this->allocate()`で確保したメモリ領域を`other.deallocate()`で問題なく解放でき、その逆も可能な場合に`true`となる。

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

## 関連項目
- [`do_is_equal`](do_is_equal.md)