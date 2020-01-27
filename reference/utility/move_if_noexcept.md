# move_if_noexcept
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  typename conditional<
    !is_nothrow_move_constructible<T>::value && is_copy_constructible<T>::value,
    const T&, T&&
  >::type move_if_noexcept(T& x) noexcept; // C++11

  template <class T>
  constexpr typename conditional<
    !is_nothrow_move_constructible<T>::value && is_copy_constructible<T>::value,
    const T&, T&&
  >::type move_if_noexcept(T& x) noexcept; // C++14
}
```
* conditional[link /reference/type_traits/conditional.md]
* is_nothrow_move_constructible[link /reference/type_traits/is_nothrow_move_constructible.md]
* is_copy_constructible[link /reference/type_traits/is_copy_constructible.md]

## 概要
例外を投げないオブジェクトをムーブする。

この関数は、対象のオブジェクトが例外を投げないムーブコンストラクタを持っている場合に右辺値参照を返し、そうでなければconst左辺値参照を返す。

この関数は、複数のオブジェクトをムーブする際に、例外安全の強い保証を得ることを目的として使用される。


## 戻り値
`std::`[`move`](/reference/utility/move.md)`(x)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <utility>

struct A {
  A() {}

  A(const A&)
    { std::cout << "copy" << std::endl; }

  A(A&&) noexcept
    { std::cout << "move" << std::endl; }
};

struct B {
  B() {}

  B(const B&)
    { std::cout << "copy" << std::endl; }

  B(B&&)
    { std::cout << "move" << std::endl; }
};

int main()
{
  // ムーブコンストラクタが例外を投げないのでムーブされる
  A a;
  A a1 = std::move_if_noexcept(a);

  // ムーブコンストラクタが例外を投げる可能性があるのでコピーされる
  B b;
  B b1 = std::move_if_noexcept(b);
}
```
* std::move_if_noexcept[color ff0000]

### 出力
```
move
copy
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012は�しく実装されていないと思われる。上記「例」のコードにおいて、ともにmoveしてしまう結果となる。


## 関連項目
- [`is_nothrow_copy_constructible`](/reference/type_traits/is_nothrow_copy_constructible.md)
- [`is_nothrow_move_constructible`](/reference/type_traits/is_nothrow_move_constructible.md)


## 参照
- [C++11 右辺値参照・ムーブセマンティクス](/lang/cpp11/rvalue_ref_and_move_semantics.md)
- [N2983 Allowing Move Constructors to Throw](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2983.html)
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)


