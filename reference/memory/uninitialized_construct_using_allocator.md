# uninitialized_construct_using_allocator
* memory[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
template<class T, class Alloc, class... Args>
  T* uninitialized_construct_using_allocator(T* p, const Alloc& alloc, Args&&... args);
```

## 概要
`Alloc` 型のアロケータオブジェクト `alloc`、および、コンストラクタ引数 `args` を用いて、`p` で指定された領域に `T` 型のオブジェクトを uses-allocator 構築する。


## 戻り値
以下と同等

```cpp
::new(static_cast<void*>(p)) T(make_obj_using_allocator<T>(alloc, std::forward<Args>(args)...))
```
* make_obj_using_allocator[link make_obj_using_allocator.md]
* forward[link ../utility/forward.md]


## 備考
- [`uses_allocator_construction_args`](uses_allocator_construction_args.md) を見ればわかる通り、uses-allocator 構築は、その名前に反して必ずしもアロケータオブジェクトを使うとは限らないので注意。  
	（[`uses_allocator_v`](uses_allocator.md)`<T, Alloc>` が `false` の場合、アロケータオブジェクト `alloc` は無視される）


## 例
```cpp example
#include <iostream>
#include <vector>
#include <utility>
#include <memory>
#include <new>

// 状態付きアロケータ
template <typename T>
class MyAlloc {
public:
  using value_type = T;
  T* allocate(std::size_t n) { return static_cast<T*>(::operator new(sizeof(T) * n)); }
  void deallocate(T* p, std::size_t n) { ::operator delete(static_cast<void*>(p), sizeof(T) * n); }
  MyAlloc(int state) noexcept : state(state) {}
  template <typename U>
  MyAlloc(const MyAlloc<U>& o) noexcept : state(o.state) {}
  int state;
};

template <typename T>
bool operator==(const MyAlloc<T>& lhs, const MyAlloc<T>& rhs) noexcept
{
  return lhs.state == rhs.state;
}

template <typename T>
bool operator!=(const MyAlloc<T>& lhs, const MyAlloc<T>& rhs) noexcept
{
  return lhs.state != rhs.state;
}

// 型別名
using VEC = std::vector<int, MyAlloc<int>>;

using V = std::pair<std::pair<VEC, int>, int>;

int main()
{
  alignas(V) char s[sizeof(V)];
  auto p = std::uninitialized_construct_using_allocator(
    reinterpret_cast<V*>(s),
    MyAlloc<int>{42}, std::make_pair(VEC{MyAlloc<int>(99)}, 1), 2
  );
  std::cout << p->first.first.get_allocator().state << '\n';
}
```
* uninitialized_construct_using_allocator[color ff0000]
* get_allocator[link ../vector/vector/get_allocator.md]

### 出力
```
42
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`uses_allocator_construction_args`](uses_allocator_construction_args.md)
- [`make_obj_using_allocator`](make_obj_using_allocator.md)
- [`uses_allocator`](uses_allocator.md)
- [`scoped_allocator_adaptor`](../scoped_allocator/scoped_allocator_adaptor.md)
- [`polymorphic_allocator`](../memory_resource/polymorphic_allocator.md)
- [`pair`](../utility/pair.md)


## 参照
- [P0591R4 Utility functions to implement uses-allocator construction](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0591r4.pdf)
