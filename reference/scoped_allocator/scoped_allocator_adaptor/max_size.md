#max_size (C++11)
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]

```cpp
size_type max_size() const;
```

##概要
一度に確保可能なメモリの最大サイズを取得する。


##戻り値
[`allocator_traits`](/reference/memory/allocator_traits.md)`<OuterAlloc>::`[`max_size`](/reference/memory/allocator_traits/max_size.md)`(`[`outer_allocator()`](./outer_allocator.md)`)`


##例
```cpp
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

  std::size_t n = alloc.max_size();
  std::cout << n << std::endl;
}
```

###出力例
```
2305843009213693951
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??
