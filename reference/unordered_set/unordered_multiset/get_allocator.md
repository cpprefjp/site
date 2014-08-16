#get_allocator (C++11)
```cpp
allocator_type get_allocator() const noexcept;
```

##概要
このコンテナで使用されているアロケータオブジェクトを返す。


##戻り値
このコンテナで使用されているアロケータオブジェクト


##例外
投げない


##計算量
定数


##例
```cpp
#include <iostream>
#include <memory>
#include <unordered_set>
#include <type_traits>

template <class T>
struct my_alloc {
  using value_type = T;
  T* allocate(std::size_t n) { return static_cast<T*>(::operator new(sizeof(T) * n)); }
  void deallocate(T* p, std::size_t) noexcept { ::operator delete(static_cast<void*>(p)); }
  template <class U>
  my_alloc(const my_alloc<U>& b) noexcept : no(b.no) { }
  explicit my_alloc(const int _no) : no(_no) { }
  int no;
  using propagate_on_container_swap = std::true_type;
};

template <class T1, class T2>
bool operator==(const my_alloc<T1>& a1, const my_alloc<T2>& a2) noexcept
{
  return a1.no == a2.no;
}

template <class T1, class T2>
bool operator!=(const my_alloc<T1>& a1, const my_alloc<T2>& a2) noexcept
{
  return a1.no != a2.no;
}

template <class Key>
using myumset = std::unordered_multiset<Key, std::hash<Key>, std::equal_to<Key>, my_alloc<Key>>;

int main()
{
  myumset<int> um1{ my_alloc<int>(1) };
  myumset<int> um2{ my_alloc<int>(2) };

  std::cout << um1.get_allocator().no << ',' << um2.get_allocator().no << std::endl;
  swap(um1, um2);

  // my_alloc は propagate_on_container_swap を true_type としているので、
  // アロケータも swap される。
  std::cout << um1.get_allocator().no << ',' << um2.get_allocator().no << std::endl;
  um1 = um2;

  // my_alloc は propagate_on_container_copy_assignment を true_type としていないので、
  // アロケータは copy されない。
  std::cout << um1.get_allocator().no << ',' << um2.get_allocator().no << std::endl;
}
```
* iostream[link /reference/iostream]
* memory[link /reference/memory.md]
* unordered_set[link /reference/unordered_set.md]
* type_traits[link /reference/type_traits.md]
* operator new[link /reference/new/new.md]
* operator delete[link /reference/new/delete.md]
* true_type[link /reference/type_traits/integral_constant-true_type-false_type.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset.md]
* hash[link /reference/functional/hash.md]
* equal_to[link /reference/functional/comparisons.md]
* swap[link ./swap_free.md]
* =[link ./op_assign.md]

###出力
```
1,2
2,1
2,1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

###備考

libstdc++ の `unordered_multiset` では、アロケータの `select_on_container_copy_construction`、`propagate_on_container_copy_assignment`、`propagate_on_container_move_assignment`、および、`propagate_on_container_swap` を正しく扱っていないため、`get_allocator` で返されるアロケータオブジェクトは予期せぬものになる可能性がある。


##参照

| | |
|----------------------------------------------------------|----------------|
| [`(constructor)`](./unordered_multiset.md)               | コンストラクタ |
| [`operator=`](./op_assign.md)                            | 代入演算子     |
| [`swap`](./op_assign.md)                                 | 内容の交換（非メンバ関数） |
| [`allocator`](/reference/memory/allocator.md)            | デフォルトのアロケータ |
| [`allocator_traits`](/reference/memory/allocator_traits) | アロケータのトレイツ |

