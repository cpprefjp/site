# destroy
* memory_resource[meta header]
* function template[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]
* cpp20deprecated[meta cpp]

```cpp
template <class T>
void destroy(T* p);
```

この関数はC++20で非推奨となった。不要な機能ではあるが、代わりが必要であれば[`allocator_traits<Alloc>::destroy()`](/reference/memory/allocator_traits/destroy.md)もしくは[`destroy_at()`](/reference/memory/destroy_at.md)を使用すること。


## 概要
指定された領域にある`T`のオブジェクトを破棄する。

## 引数
- `p` -- 対象となるオブジェクトが構築されているメモリへのポインタ

## 効果
あたかも`p->~T()`を実行したように、`p`の指す`T`のオブジェクトを破棄する。

メモリ領域の解放は行われないため、別に[`deallocate`](deallocate.md)で行う必要がある。

## 非推奨の詳細

`polymorphic_allocator`も含めたアロケータはコンテナから利用される際に`allocator_traits`を介して利用され、`allocator_traits`の提供するデフォルト実装によってアロケータとしての多くの部分が補われる。

本関数は、[`allocator_traits<Alloc>::destroy()`](/reference/memory/allocator_traits/destroy.md)で提供されているデフォルト実装と完全に同一の実装となっており、追加の事を何もしていない。従って有用性は何もなく、非推奨とされた。

おそらく、[`construct()`](construct.md)メンバ関数との対称性を意識して追加されていたものと思われる。なお、`construct()`メンバ関数は[uses-allocator 構築](/reference/memory/uses_allocator.md)のために追加の仕事を担っており、こちらの関数には有用であるため非推奨とはされていない。

`allocator_traits`を介して`polymorphic_allocator`を使用する場合は本関数の有無を気にする必要はないが、もし本関数が必要となった場合は代わりに[`destroy_at()`](/reference/memory/destroy_at.md)を利用できる。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main()
{
  std::pmr::polymorphic_allocator<int> alloc{};

  //メモリの確保
  int* array = alloc.allocate(4);

  //要素を構築
  for (int i = 0; i < 4; ++i) {
    alloc.construct(array + i, i);
  }

  for (int i = 0; i < 4; ++i) {
    std::cout << array[i] << std::endl;
  }

  //要素を破棄
  for (int i = 0; i < 4; ++i) {
    alloc.destroy(array + i);
  }

  //メモリの解放
  alloc.deallocate(array, 4);
}
```
* destroy[color ff0000]
* allocate[link allocate.md]
* construct[link construct.md]
* deallocate[link deallocate.md]

### 出力
```
0
1
2
3
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
    - 2017, 2019共にこの関数は実装されなかった

## 関連項目
- [`destroy_at`](/reference/memory/destroy_at.md)
- [`allocator_traits::destroy`](/reference/memory/allocator_traits/destroy.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
- [destroy: Missing member function of std::pmr::polymorphic_allocator - Developer Community](https://developercommunity.visualstudio.com/content/problem/394908/destroy-missing-member-function-of-stdpmrpolymorph.html)
- [LWG Issue 3036. `polymorphic_allocator::destroy` is extraneous](https://cplusplus.github.io/LWG/issue3036)
