# allocate
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pointer allocate(size_type n);                                        // (1) C++11
[[nodiscard]] pointer allocate(size_type n);                          // (1) C++20

pointer allocate(size_type n, const_void_pointer hint);               // (2) C++11
[[nodiscard]] pointer allocate(size_type n, const_void_pointer hint); // (2) C++20
```

## 概要
メモリを確保する。


## 戻り値
- (1) : [`allocator_traits`](/reference/memory/allocator_traits.md)`<OuterAlloc>::`[`allocate`](/reference/memory/allocator_traits/allocate.md)`(`[`outer_allocator()`](outer_allocator.md)`, n)`
- (2) : [`allocator_traits`](/reference/memory/allocator_traits.md)`<OuterAlloc>::`[`allocate`](/reference/memory/allocator_traits/allocate.md)`(`[`outer_allocator()`](outer_allocator.md)`, n, hint)`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>
#include <scoped_allocator>

template <class T>
using alloc_t = std::allocator<T>;

// コンテナの要素(Inner)
using string = std::basic_string<
  char,
  std::char_traits<char>,
  alloc_t<char>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<
  T,
  std::scoped_allocator_adaptor<alloc_t<T>, alloc_t<typename T::value_type>>
>;

int main()
{
  vector<string>::allocator_type alloc {
    alloc_t<string>(), // vector自体のアロケータオブジェクト
    alloc_t<char>()    // vectorの全ての要素に使用するアロケータオブジェクト
  };

  // 外側のアロケータを使用し、stringが3要素入るメモリを確保
  const std::size_t n = 3;
  string* p = alloc.allocate(n);

  // メモリを解放
  alloc.deallocate(p, n);
}
```
* allocate[color ff0000]
* alloc.deallocate[link deallocate.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
