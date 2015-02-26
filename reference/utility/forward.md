#forward (C++11)
* utility[meta header]
* std[meta namespace]

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

##概要
関数テンプレートの引数を転送する。

この関数は、渡された引数を`T&&`型にキャストして返す。（注：`T`が左辺値参照の場合には`T&&`も左辺値参照になり、それ以外の場合に`T&&`は右辺値参照になる。）

この関数は、主に転送関数（ forwarding function ）の実装を単純化する目的で使われる：

```cpp
template <class... Args>
void forward_to_f(Args&&... args)
{
  f(std::forward<Args>(args)...);
}
```

この関数に渡した引数は、多くのケースにおいて右辺値参照にキャストされ、移動されることに注意すること。同じ引数に対して二回以上関数を呼び出しを行いたい場合は、`std::forward()`は使ってはならない：

```cpp
templat e<class T>
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

##戻り値
`static_cast<T&&>(t)`


##例外
投げない


##備考
二番目の形式（ `template <class T> T&& forward(typename remove_reference<T>::type&&) noexcept;` ）が左辺値参照の型に対して呼ばれた場合、プログラムは不適格である。（例： `std::forward<int&>(1)` は不適格）


##例
```cpp
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
* forward[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)


