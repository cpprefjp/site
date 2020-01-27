# deallocate
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void deallocate(pointer p, size_type n);
```

## 概要
メモリを解放する。


## 戻り値
[`allocator_traits`](/reference/memory/allocator_traits.md)`<OuterAlloc>::`[`deallocate`](/reference/memory/allocator_traits/deallocate.md)`(`[`outer_allocator()`](outer_allocator.md)`, p, n)`


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
    alloc_t<string>(), // vector自体のア�ケータオブジェクト
    alloc_t<char>()    // vectorの全ての要素に使用するア�ケータオブジェクト
  };

  // 外側のア�ケータを使用し、stringが3要素入るメモリを確保
  const std::size_t n = 3;
  string* p = alloc.allocate(n);

  // メモリを解放
  alloc.deallocate(p, n);
}
```
* deallocate[color ff0000]
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]
* alloc.allocate[link allocate.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
