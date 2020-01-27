# make_obj_using_allocator
* memory[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
template<class T, class Alloc, class... Args>
  T make_obj_using_allocator(const Alloc& alloc, Args&&... args);
```

## 概要
`Alloc` 型のア�ケータオブジェクト `alloc`、および、コンストラクタ引数 `args` を用いて、`T` 型のオブジェクトを uses-allocator 構築する。

構築対象の型 `T` は関数引数からは推論できないため、明示的に指定する必要がある。


## 戻り値
以下と同�

```cpp
make_from_tuple<T>(uses_allocator_construction_args<T>(alloc, std::forward<Args>(args)...))
```
* make_from_tuple[link ../tuple/make_from_tuple.md]
* uses_allocator_construction_args[link uses_allocator_construction_args.md]
* forward[link ../utility/forward.md]


## 備考
- [`uses_allocator_construction_args`](uses_allocator_construction_args.md) を見ればわかる通り、uses-allocator 構築は、その名前に反して必ずしもア�ケータオブジェクトを使うとは限らないので注意。  
	（[`uses_allocator_v`](uses_allocator.md)`<T, Alloc>` が `false` の場合、ア�ケータオブジェクト `alloc` は無視される）


## 例
```cpp example
#include <iostream>
#include <vector>
#include <utility>
#include <memory>
#include <new>

// 状態付きア�ケータ
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
  auto v = std::make_obj_using_allocator<V>(
    MyAlloc<int>{42}, std::make_pair(VEC{MyAlloc<int>(99)}, 1), 2
  );
  std::cout << v.first.first.get_allocator().state << '\n';
}
```
* make_obj_using_allocator[color ff0000]
* get_allocator[link ../vector/vector/get_allocator.md]

### 出力
```
42
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??（9.0.0 の時点で未実装）
- [GCC](/implementation.md#gcc): 9.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`uses_allocator_construction_args`](uses_allocator_construction_args.md)
- [`uninitialized_construct_using_allocator`](uninitialized_construct_using_allocator.md)
- [`uses_allocator`](uses_allocator.md)
- [`scoped_allocator_adaptor`](../scoped_allocator/scoped_allocator_adaptor.md)
- [`polymorphic_allocator`](../memory_resource/polymorphic_allocator.md)
- [`pair`](../utility/pair.md)


## 参照
- [P0591R4 Utility functions to implement uses-allocator construction](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0591r4.pdf)
