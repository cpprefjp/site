# destroy
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
template <class T>
void destroy(T* p);
```

## 概要
指定された領域にある`T`のオブジェクトを破棄する。

## 引数
- `p` -- 対象となるオブジェクトが構築されているメモリへのポインタ

## 効果
あたかも`p->~T()`を実行したように、`p`の指す`T`のオブジェクトを破棄する。

メモリ領域の解放は行われないため、別に[`deallocate`](deallocate.md)で行う必要がある。

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
- [`destroy`](/reference/memory/allocator_traits/destroy.md)