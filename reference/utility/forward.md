# forward
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T&& forward(typename remove_reference<T>::type& t) noexcept;            // (1) C++11

  template <class T>
  constexpr T&& forward(typename remove_reference<T>::type& t) noexcept;  // (1) C++14

  template <class T>
  T&& forward(typename remove_reference<T>::type&& t) noexcept;           // (2) C++11

  template <class T>
  constexpr T&& forward(typename remove_reference<T>::type&& t) noexcept; // (2) C++14
}
```
* remove_reference[link /reference/type_traits/remove_reference.md]

## 概要
関数テンプレートの引数を転送する。

この関数は、渡された引数を`T&&`型に�ャストして返す。（注：`T`が左辺値参照の場合には`T&&`も左辺値参照になり、それ以外の場合に`T&&`は右辺値参照になる。）

この関数は、主に転送関数（forwarding function）の実装を単純化する目的で使われる：

```cpp
template <class... Args>
void forward_to_f(Args&&... args)
{
  f(std::forward<Args>(args)...);
}
```

```cpp
auto forward_to_f = [](auto&&... args)
{
  f(std::forward<decltype(args)>(args)...);
};
```

この関数に渡した引数は、多くのケースにおいて右辺値参照に�ャストされ、ムーブされることに注意すること。同じ引数に対して二回以上関数を呼び出しを行いたい場合は、`std::forward()`は使ってはならない：

```cpp
template <class T>
void bad(T&& x)
{
  f(std::forward<T>(x));  // xはここでムーブされるかもしれないので
  g(std::forward<T>(x));  // この関数呼び出しは予想外の結果になる可能性がある
}

template <class T>
void good(T&& x)
{
  f(x);                   // まだ使う場合は転送は行わず、
  g(std::forward<T>(x));  // 最後に使うときのみ転送すれば安全
}
```

## 戻り値
`static_cast<T&&>(t)`


## 例外
投げない


## 備考
- (2) : この形式が左辺値参照の型に対して呼ばれた場合、プ�グラムは不適格である。（例： `std::forward<int&>(1)` は不適格）


## 例
```cpp example
#include <memory>
#include <utility>

template <class T, class A1, class A2>
std::shared_ptr<T> factory(A1&& a1, A2&& a2) {
  return std::shared_ptr<T>(new T(std::forward<A1>(a1), std::forward<A2>(a2)));
}

struct A {
  A(int&, const double&) {}
};

int main()
{
//std::shared_ptr<A> sp1 = factory<A>(2, 1.414);  // error: 2 will not bind to int&

  int i = 2;
  std::shared_ptr<A> sp2 = factory<A>(i, 1.414);  // OK
}
```
* std::forward[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015


## 参照
- [C++11 右辺値参照・ムーブセマンティクス](/lang/cpp11/rvalue_ref_and_move_semantics.md)
- [N1377 A Proposal to Add Move Semantics Support to the C++ Language](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1377.htm)
- [N1690 A Proposal to Add an Rvalue Reference to the C++ Language](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1690.html)
- [N1385 The Forwarding Problem: Arguments](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1385.htm)
- [N2027 A Brief Introduction to Rvalue References](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2027.html)
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)


