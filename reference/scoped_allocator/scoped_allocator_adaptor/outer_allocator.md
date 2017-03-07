#outer_allocator
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
outer_allocator_type& outer_allocator() noexcept;             // (1)
const outer_allocator_type& outer_allocator() const noexcept; // (2)
```

##概要
外側のアロケータを取得する。


##戻り値
- (1) : `static_cast<OuterAlloc&>(*this)`
- (2) : `static_cast<const OuterAlloc&>(*this)`


##例
```cpp
#include <iostream>
#include <vector>
#include <string>

#include <scoped_allocator>

// std::allocatorに状態変数を持たせただけのクラス
template <class T>
class MyAlloc : public std::allocator<T> {
  int state_; // 状態

  using BaseType = std::allocator<T>;
  template <class> friend class MyAlloc;
public:
  using BaseType::BaseType;

  MyAlloc(int state = 0)
    : state_(state) {}

  template <class U>
  MyAlloc(const MyAlloc<U>& alloc)
    : state_(alloc.state_) {}

  int getState() const { return state_; }
};

template <class T, class U>
bool operator==(const MyAlloc<T>&, const MyAlloc<U>&)
{ return true; }

template <class T, class U>
bool operator!=(const MyAlloc<T>&, const MyAlloc<U>&)
{ return false; }

template <class T>
using alloc_t = MyAlloc<T>;

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
  int outer_state = 5;
  int inner_state = 2;
  vector<string>::allocator_type alloc {
    alloc_t<string>(outer_state), // vector自体のアロケータオブジェクト
    alloc_t<char>(inner_state)    // vectorの全ての要素に使用するアロケータオブジェクト
  };

  // 外側(vector自体)のアロケータオブジェクトを取得
  alloc_t<string> outer_alloc = alloc.outer_allocator();
  std::cout << outer_alloc.getState() << std::endl;
}
```
* outer_allocator()[color ff0000]
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

###出力
```
5
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??
