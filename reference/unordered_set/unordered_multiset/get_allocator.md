# get_allocator
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
allocator_type get_allocator() const noexcept;
```

## 概要
このコンテナで使用されているアロケータオブジェクトを返す。


## 戻り値
このコンテナで使用されているアロケータオブジェクト


## 例外
投げない


## 計算量
定数


## 例
```cpp example
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
  myumset<int> ums1{ my_alloc<int>(1) };
  myumset<int> ums2{ my_alloc<int>(2) };

  std::cout << ums1.get_allocator().no << ',' << ums2.get_allocator().no << std::endl;
  swap(ums1, ums2);

  // my_alloc は propagate_on_container_swap を true_type としているので、
  // アロケータも swap される。
  std::cout << ums1.get_allocator().no << ',' << ums2.get_allocator().no << std::endl;
  ums1 = ums2;

  // my_alloc は propagate_on_container_copy_assignment を true_type としていないので、
  // アロケータは copy されない。
  std::cout << ums1.get_allocator().no << ',' << ums2.get_allocator().no << std::endl;
}
```
* get_allocator()[color ff0000]
* ::operator new[link /reference/new/op_new.md]
* ::operator delete[link /reference/new/op_delete.md]
* std::hash[link /reference/functional/hash.md]
* std::equal_to[link /reference/functional/equal_to.md]
* swap[link swap_free.md]

### 出力
```
1,2
2,1
2,1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified], 4.5.3 [mark verified], 4.6.3 [mark verified], 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
	- 2010は、`noexcept`が修飾されていない。
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。

### 備考

libstdc++ の `unordered_multiset` では、アロケータの `select_on_container_copy_construction`、`propagate_on_container_copy_assignment`、`propagate_on_container_move_assignment`、および、`propagate_on_container_swap` を正しく扱っていないため、`get_allocator` で返されるアロケータオブジェクトは予期せぬものになる可能性がある。


## 関連項目

| 名前 | 説明 |
|----------------------------------------------------------|----------------|
| [`(constructor)`](op_constructor.md)                   | コンストラクタ |
| [`operator=`](op_assign.md)                            | 代入演算子     |
| [`swap`](swap_free.md)                                 | 内容の交換（非メンバ関数） |
| [`allocator`](/reference/memory/allocator.md)            | デフォルトのアロケータ |
| [`allocator_traits`](/reference/memory/allocator_traits.md) | アロケータのトレイツ |
