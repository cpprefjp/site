# as_const
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr add_const_t<T>& as_const(T& t) noexcept;

  template <class T>
  void as_const(const T&&) = delete;
}
```
* add_const_t[link /reference/type_traits/add_const.md]

## 概要
左辺値参照を`const`左辺値参照にする。

`const`と非`const`のオーバー�ードがある場合、`const`版を明示的に呼び出す目的で使われる。

## 戻り値
```cpp
add_const_t<T>&(t)
```
* add_const_t[link /reference/type_traits/add_const.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <utility>

struct A {
  void f()
  {
    std::cout << "non-const" << std::endl;
  }

  void f() const
  {
    std::cout << "const" << std::endl;
  }
};

int main()
{
  A a;
  a.f(); // f()が呼ばれる
  std::as_const(a).f(); // f() constが呼ばれる
}
```
* std::as_const[color ff0000]

### 出力
```
non-const
const
```

## バージョン
### 言語
- C++17

## 処理系
- [Clang](/implementation.md#clang): 3.8
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 Update 2


## 参照
- [P0007R1 Constant View: A proposal for a `std::as_const` helper function template](http://open-std.org/JTC1/SC22/WG21/docs/papers/2015/p0007r1.html)
