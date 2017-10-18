# destroy
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]
* cpp17deprecated[meta cpp]

```cpp
// C++03
void destroy(pointer p);

// C++11
template <class U>
void destroy(U* p);
```

この関数は、C++17から非推奨となった。代わりに[`std::allocator_traits`](/reference/memory/allocator_traits.md)`::`[`destroy()`](/reference/memory/allocator_traits/destroy.md)関数を使用すること。


## 概要
インスタンスを破棄する。


## 効果
- C++03 : `((T*)p)->˜T()`
- C++11 : `p->˜U()`


## 戻り値
なし


## 非推奨の詳細
多くのメンバ関数は、アロケータの実装によらず、共通に定義できるものだった。そのため、アロケータの中間インタフェースである[`std::allocator_traits`](/reference/memory/allocator_traits.md)クラスに、共通のデフォルト実装を定義することとなった。

特殊なアロケータの実装では、この関数を独自に実装する必要があるかもしれない。その場合は[`std::allocator_traits`](/reference/memory/allocator_traits.md)のデフォルト機能を使用せずに、この関数を独自アロケータのインタフェースとして定義すれば、[`std::allocator_traits`](/reference/memory/allocator_traits.md)クラスを介してインタフェースにアクセスしたとしても、その独自実装が使用される。

少なくとも、`std::allocator`クラスのあらゆる標準ライブラリの実装において、この関数は特殊な動作をする必要がないため、[`std::allocator_traits`](/reference/memory/allocator_traits.md)クラスのデフォルト実装に任せることとなった。


## 例
```cpp
#include <iostream>
#include <memory>
#include <utility>

int main()
{
  using value_type = std::pair<int, char>;
  std::allocator<value_type> alloc;

  std::size_t n = 1;
  value_type* p = alloc.allocate(n);

  // メモリ領域にpairオブジェクトを構築
  alloc.construct(p, 3, 'a');

  std::cout << p->first << ", " << p->second << std::endl;

  // pairオブジェクトを破棄
  alloc.destroy(p);

  alloc.deallocate(p, n);
}
```
* destroy[color ff0000]
* alloc.allocate[link allocate.md]
* alloc.construct[link construct.md]
* alloc.deallocate[link deallocate.md]

### 出力
```
3, a
```


## 参照
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
