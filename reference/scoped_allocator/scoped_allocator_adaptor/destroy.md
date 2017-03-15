# destroy
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class T>
void destroy(T* p);
```

## 概要
オブジェクトを破棄する。


## 効果

この関数において、以下の名称定義を行う。

- `OUTERMOST(x)`関数は、アロケータオブジェクト`x`が`outer_allocator()`メンバ関数を持っている場合、その関数によって返されるアロケータを返す。そうでない場合は、`x`を返す。
- [`allocator_traits`](/reference/memory/allocator_traits.md)`<decltype(OUTERMOST(x))>`を`OUTERMOST_ALLOC_TRAITS(x)`とする。

この定義の元に、以下の関数呼び出しを行う：

```cpp
OUTERMOST_ALLOC_TRAITS(*this)::destroy(OUTERMOST(*this), p)
```
* destroy[link /reference/memory/allocator_traits/destroy.md]

## 例
```cpp
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

  // 外側のアロケータを使用し、stringが1要素入るメモリを確保
  const std::size_t n = 1;
  string* p = alloc.allocate(n);

  // オブジェクトを構築
  alloc.construct(p, "hello");

  // オブジェクトを破棄
  alloc.destroy(p);

  // メモリを解放
  alloc.deallocate(p, n);
}
```
* destroy[color ff0000]
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]
* alloc.allocate[link allocate.md]
* alloc.construct[link construct.md]
* alloc.deallocate[link deallocate.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??
