# max_size
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]

```cpp
size_type max_size() const throw();  // C++03
size_type max_size() const noexcept; // C++11
```

この関数は、C++17から非推奨となった。代わりに[`std::allocator_traits`](/reference/memory/allocator_traits.md)`::`[`max_size()`](/reference/memory/allocator_traits/max_size.md)関数を使用すること。

## 概要
一度に確保可能なメモリの最大サイズを取得する。


## 戻り値
[`allocate`](allocate.md)`(N, 0)`が成功するであろう最大の`N`を返す。


## 非推奨の詳細
多くのメンバ関数は、アロケータの実装によらず、共通に定義できるものだった。そのため、アロケータの中間インタフェースである[`std::allocator_traits`](/reference/memory/allocator_traits.md)クラスに、共通のデフォルト実装を定義することとなった。

特殊なアロケータの実装では、この関数を独自に実装する必要があるかもしれない。その場合は[`std::allocator_traits`](/reference/memory/allocator_traits.md)のデフォルト機能を使用せずに、この関数を独自アロケータのインタフェースとして定義すれば、[`std::allocator_traits`](/reference/memory/allocator_traits.md)クラスを介してインタフェースにアクセスしたとしても、その独自実装が使用される。

少なくとも、`std::allocator`クラスのあらゆる標準ライブラリの実装において、この関数は特殊な動作をする必要がないため、[`std::allocator_traits`](/reference/memory/allocator_traits.md)クラスのデフォルト実装に任せることとなった。


## 例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::allocator<int> alloc;

  std::cout << alloc.max_size() << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
4611686018427387903
```


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
