#get_allocator
```cpp
<pre style='margin:0'><code style='color:black'>allocator_type get_allocator() const noexcept;
</pre>
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
<pre style='margin:0'><code style='color:black'>#include <iostream>
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
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* memory[link /reference/memory.md]
* unordered_set[link /reference/unordered_set.md]
* type_traits[link /reference/type_traits.md]
* operator new[link /reference/new/new.md]
* operator delete[link /reference/new/delete.md]
* true_type[link /reference/type_traits/integral_constant-true_type-false_type.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset.md]
* hash[link /reference/functional/hash.md]
* equal_to[link /reference/functional/comparisons.md]
* swap[link /reference/unordered_set/unordered_multiset/swap_free.md]
* =[link /reference/unordered_set/unordered_multiset/op_assign.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>1,2
2,1
2,1</pre>
```

##バージョン


###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): -

- [Clang, C++0x mode](/implementation#clang.md): 3.0, 3.1

- [GCC](/implementation#gcc.md): -

- [GCC, C++0x mode](/implementation#gcc.md): 4.4.7, 4.5.3, 4.6.3, 4.7.0

- [ICC](/implementation#icc.md): ?

- [Visual C++](/implementation#visual_cpp.md): ?

###備考

libstdc++ の <code style='color:black'>unordered_multiset</code> では、アロケータの <code style='color:black'>select_on_container_copy_construction</code>、<code style='color:black'>propagate_on_container_copy_assignment</code>、<code style='color:black'>propagate_on_container_move_assignment</code>、および、<code style='color:black'>propagate_on_container_swap</code> を正しく扱っていないため、<code style='color:black'>get_allocator</code> で返されるアロケータオブジェクトは予期せぬものになる可能性がある。


##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[(constructor)](/reference/unordered_set/unordered_multiset/unordered_multiset.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンストラクタ</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[operator=](/reference/unordered_set/unordered_multiset/op_assign.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>代入演算子</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[swap](/reference/unordered_set/unordered_multiset/op_assign.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>内容の交換（非メンバ関数）</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[allocator](/reference/memory/allocator.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>デフォルトのアロケータ</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>アロケータのトレイツ</td>
</tr>
</tbody>
</table>