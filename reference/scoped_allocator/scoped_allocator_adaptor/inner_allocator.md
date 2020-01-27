# inner_allocator
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
inner_allocator_type& inner_allocator() noexcept;             // (1)
const inner_allocator_type& inner_allocator() const noexcept; // (2)
```

## 概要
内側のア�ケータを取得する。


## 戻り値
内側のア�ケータオブジェクトを返す。

このクラスのテンプレートパラメータ`InnerAlloc...`が空の場合は、外側と同じア�ケータを内側でも使用するものと見なし、`*this`を返す。


## 例
```cpp example
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
    alloc_t<string>(outer_state), // vector自体のア�ケータオブジェクト
    alloc_t<char>(inner_state)    // vectorの全ての要素に使用するア�ケータオブジェクト
  };

  // 内側(vectorの全ての要素)のア�ケータオブジェクトを取得
  alloc_t<char> inner_alloc = alloc.inner_allocator();
  std::cout << inner_alloc.getState() << std::endl;
}
```
* inner_allocator()[color ff0000]
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

### 出力
```
2
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
