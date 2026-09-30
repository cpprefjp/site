# Cpp17Allocator
* named requirement[meta id-type]

## 概要
`Cpp17Allocator`は、記憶域の確保と解放を行うアロケータの要件である。

[`std::vector`](/reference/vector/vector.md)などのコンテナ、[`std::basic_string`](/reference/string/basic_string.md)、文字列ストリーム、[`std::match_results`](/reference/regex/match_results.md)が、記憶域の確保方法を差し替えるためにこの要件を要求する。

アロケータは[`std::allocator_traits`](/reference/memory/allocator_traits.md)を介して使用される。要件のほとんどは省略でき、省略した項目は[`std::allocator_traits`](/reference/memory/allocator_traits.md)が既定の定義を与える。そのため、自作のアロケータは少数の項目だけを定義すればよい。


## 要件
以下では、`T`を要素型、`X`を`T`に対するアロケータ型、`Y`を別の要素型`U`に対するアロケータ型、`a`・`a1`・`a2`を`X`の左辺値、`b`を`Y`の値、`p`を`a.allocate()`で得られたポインタ、`n`を要素数とする。

### 省略できない項目
| 項目                     | 説明                                                                 |
|--------------------------|----------------------------------------------------------------------|
| `X::value_type`          | 要素型。`T`と同じ型であること                                        |
| `a.allocate(n)`          | `n`個の`T`を格納できる記憶域を確保し、その先頭を指すポインタを返す   |
| `a.deallocate(p, n)`     | `a.allocate(n)`で確保した記憶域を解放する                            |
| `a1 == a2`、`a == b`     | 一方で確保した記憶域を他方で解放できるかを表す                       |

このほか、`X`が[`Cpp17CopyConstructible`](/requirements/Cpp17CopyConstructible.md.nolink)要件を満たすこと、および`Y`から`X`を構築できることが要求される。コンテナは内部で要素型とは異なる型 (リストのノードなど) の記憶域を確保するため、要素型を差し替えたアロケータ型から変換できる必要がある。

### 省略できる項目
| 項目                                          | 既定の定義                                                    |
|-----------------------------------------------|---------------------------------------------------------------|
| `X::pointer`                                  | `T*`                                                          |
| `X::const_pointer`                            | [`pointer_traits`](/reference/memory/pointer_traits.md)`<pointer>::rebind<const T>`                    |
| `X::void_pointer`                             | [`pointer_traits`](/reference/memory/pointer_traits.md)`<pointer>::rebind<void>`                       |
| `X::const_void_pointer`                       | [`pointer_traits`](/reference/memory/pointer_traits.md)`<pointer>::rebind<const void>`                 |
| `X::size_type`                                | [`make_unsigned_t`](/reference/type_traits/make_unsigned.md)`<difference_type>`                            |
| `X::difference_type`                          | [`pointer_traits`](/reference/memory/pointer_traits.md)`<pointer>::difference_type`                    |
| `X::rebind<U>::other`                         | テンプレート引数を`U`に差し替えた型                           |
| `a.allocate(n, y)`                            | `a.allocate(n)`                                               |
| `a.allocate_at_least(n)`                      | `{a.allocate(n), n}` (C++23)                                  |
| `a.max_size()`                                | [`numeric_limits`](/reference/limits/numeric_limits.md)`<size_type>::`[`max()`](/reference/limits/numeric_limits/max.md)` / sizeof(value_type)`        |
| `a.construct(c, args...)`                     | [`construct_at`](/reference/memory/construct_at.md)`(c, `[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`                |
| `a.destroy(c)`                                | [`destroy_at`](/reference/memory/destroy_at.md)`(c)`                                               |
| `a.select_on_container_copy_construction()`   | `a`                                                           |
| `X::propagate_on_container_copy_assignment`   | [`false_type`](/reference/type_traits/integral_constant.md)                                                  |
| `X::propagate_on_container_move_assignment`   | [`false_type`](/reference/type_traits/integral_constant.md)                                                  |
| `X::propagate_on_container_swap`              | [`false_type`](/reference/type_traits/integral_constant.md)                                                  |
| `X::is_always_equal`                          | [`is_empty`](/reference/type_traits/is_empty.md)`<X>::type`                                           |

`X::pointer`などのポインタ型には、[`Cpp17NullablePointer`](/requirements/Cpp17NullablePointer.md.nolink)要件が要求される。`X::pointer`と`X::const_pointer`には、加えて[`Cpp17RandomAccessIterator`](/requirements/Cpp17RandomAccessIterator.md.nolink)要件が要求される。


## 対応する標準コンセプト
規格は、この要件の最小限の部分を表す説明専用コンセプト`simple-allocator`を定義している。

```cpp
namespace std {
  template<class Alloc>
  concept simple-allocator =
    requires(Alloc alloc, size_t n) {
      { *alloc.allocate(n) } -> same_as<typename Alloc::value_type&>;
      { alloc.deallocate(alloc.allocate(n), n) };
    } &&
    copy_constructible<Alloc> &&
    equality_comparable<Alloc>;
}
```

この要件との違いは以下である。

- `simple-allocator`は、記憶域の確保・解放、コピー構築、等値比較だけを要求する。要素型を差し替えたアロケータ型からの変換や、省略できる項目の意味は表現しない
- コンテナが要求するのはこの要件であり、`simple-allocator`ではない。`simple-allocator`は[`std::execution::get_allocator()`](/reference/execution/get_allocator.md)が返す型の適格要件のように、アロケータであることだけを判定する箇所で使用される
- `simple-allocator`はコンパイル時に検査できる

この要件を満たす型は`simple-allocator`のモデルとなる。


## 例
### アロケータを実装する (最小要件を満たす実装)
省略できない項目だけを定義する。省略した項目は[`std::allocator_traits`](/reference/memory/allocator_traits.md)が既定の定義を与える。

```cpp example
#include <iostream>
#include <vector>
#include <new>

// 最小限のアロケータ。省略した項目はstd::allocator_traitsが既定の定義を与える
template <class T>
struct LoggingAllocator {
  // 要素型。省略できない
  using value_type = T;

  LoggingAllocator() = default;

  // コンテナが内部で別の要素型のアロケータを必要とするため、変換できるようにする
  template <class U>
  LoggingAllocator(const LoggingAllocator<U>&) {}

  // n個分の記憶域を確保する
  T* allocate(std::size_t n)
  {
    std::cout << "allocate " << n << std::endl;
    return static_cast<T*>(::operator new(n * sizeof(T)));
  }

  // allocate()で確保した記憶域を解放する
  void deallocate(T* p, std::size_t n)
  {
    std::cout << "deallocate " << n << std::endl;
    ::operator delete(p);
  }

  // 一方で確保した記憶域を他方で解放できる場合に等値とする
  template <class U>
  bool operator==(const LoggingAllocator<U>&) const
  {
    return true;
  }
};

int main()
{
  std::vector<int, LoggingAllocator<int>> v;
  v.reserve(2);
  v.push_back(1);
}
```
* ::operator new[link /reference/new/op_new.md]
* ::operator delete[link /reference/new/op_delete.md]
* v.reserve[link /reference/vector/vector/reserve.md]
* v.push_back[link /reference/vector/vector/push_back.md]

#### 出力
```
allocate 2
deallocate 2
```

### アロケータを実装する (要件を完全に満たす実装)
省略できる項目もすべて明示的に定義すると、以下のようになる。各項目には既定の定義と同じ内容を書いているため、動作は最小要件を満たす実装と変わらない。

```cpp example
#include <iostream>
#include <list>
#include <memory>
#include <limits>
#include <new>
#include <type_traits>
#include <utility>

// すべての項目を明示的に定義したアロケータ
template <class T>
struct FullAllocator {
  using value_type = T;

  // ポインタ型。既定ではvalue_typeから導出される
  using pointer = T*;
  using const_pointer = const T*;
  using void_pointer = void*;
  using const_void_pointer = const void*;

  // サイズと差分の型。既定ではポインタ型から導出される
  using size_type = std::size_t;
  using difference_type = std::ptrdiff_t;

  // コンテナのコピー代入・ムーブ代入・交換でアロケータを伝播させるか
  // 既定ではいずれもfalse_type
  using propagate_on_container_copy_assignment = std::false_type;
  using propagate_on_container_move_assignment = std::true_type;
  using propagate_on_container_swap = std::false_type;

  // 同じ型のアロケータがつねに等値であるか。既定ではstd::is_empty<X>::type
  using is_always_equal = std::true_type;

  // 別の要素型に対応するアロケータ型。既定ではテンプレート引数を差し替えた型
  template <class U>
  struct rebind {
    using other = FullAllocator<U>;
  };

  FullAllocator() = default;

  template <class U>
  FullAllocator(const FullAllocator<U>&) {}

  pointer allocate(size_type n)
  {
    return static_cast<pointer>(::operator new(n * sizeof(T)));
  }

  // ヒントを指定した確保。既定ではallocate(n)が使用される
  pointer allocate(size_type n, const_void_pointer)
  {
    return allocate(n);
  }

  // 要求した数以上の記憶域を確保する。既定ではallocate(n)が使用される
  std::allocation_result<pointer, size_type> allocate_at_least(size_type n)
  {
    return {allocate(n), n};
  }

  void deallocate(pointer p, size_type)
  {
    ::operator delete(p);
  }

  // 確保できる最大の要素数。既定では要素型のサイズから算出される
  size_type max_size() const
  {
    return std::numeric_limits<size_type>::max() / sizeof(T);
  }

  // 要素の構築と破棄。既定ではstd::construct_at()とstd::destroy_at()が使用される
  template <class U, class... Args>
  void construct(U* p, Args&&... args)
  {
    std::construct_at(p, std::forward<Args>(args)...);
  }

  template <class U>
  void destroy(U* p)
  {
    std::destroy_at(p);
  }

  // コンテナのコピー構築時に、コピー先が使用するアロケータ。既定では*this
  FullAllocator select_on_container_copy_construction() const
  {
    return *this;
  }

  template <class U>
  bool operator==(const FullAllocator<U>&) const
  {
    return true;
  }
};

int main()
{
  // listはノードを確保するため、rebindによって要素型を差し替えたアロケータを使用する
  std::list<int, FullAllocator<int>> ls = {1, 2, 3};

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* std::ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]
* std::allocation_result[link /reference/memory/allocation_result.md]
* std::construct_at[link /reference/memory/construct_at.md]
* std::destroy_at[link /reference/memory/destroy_at.md]
* ::operator new[link /reference/new/op_new.md]
* ::operator delete[link /reference/new/op_delete.md]

#### 出力
```
1
2
3
```


## 関連項目
- [標準ライブラリ要件](/requirements.md)
- [`std::allocator`](/reference/memory/allocator.md)
- [`std::allocator_traits`](/reference/memory/allocator_traits.md)
- [`std::pmr::polymorphic_allocator`](/reference/memory_resource/polymorphic_allocator.md)
- [`Cpp17CopyConstructible`](/requirements/Cpp17CopyConstructible.md.nolink)
- [`Cpp17NullablePointer`](/requirements/Cpp17NullablePointer.md.nolink)
