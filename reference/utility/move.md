# move (utility)
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  typename remove_reference<T>::type&& move(T&& t) noexcept; // C++11

  template <class T>
  constexpr typename remove_reference<T>::type&& move(T&& t) noexcept; // C++14
}
```
* remove_reference[link /reference/type_traits/remove_reference.md]

## 概要
左辺値を右辺値に�ャストする。

この関数は、渡されたオブジェクトを右辺値参照に�ャストし、ムーブセマンティクスを適用させる。


## 戻り値
```cpp
static_cast<typename std::remove_reference<T>::type &&>(t)
```
* std::remove_reference[link /reference/type_traits/remove_reference.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <utility>

struct A {
  A() {}

  // 左辺値からコピー
  A(const A&)
  {
    std::cout << "copy" << std::endl;
  }

  // 右辺値からムーブ
  A(A &&)
  {
    std::cout << "move" << std::endl;
  }
};

int main()
{
  A a;
  A a1 = a;             // A(const A&)が呼ばれる
  A a2 = std::move(a);  // A(A&&)が呼ばれる
}
```
* std::move[color ff0000]

### 出力
```
copy
move
```

上記の`a1`の初期化において、`a`は左辺値なので、コンストラクタ`A(const A&)`が呼び出され、`a1`は`a`からコピーされる。`a2`の初期化においては、`std::move(a)`呼び出しのため、コンストラクタ`A(A&&)`が呼ばれ、`a2`は`a`からムーブされる。

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

