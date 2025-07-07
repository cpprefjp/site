# copy_constructible
* concepts[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept copy_constructible =
    move_constructible<T> &&
    constructible_from<T, T&> && convertible_to<T&, T> &&
    constructible_from<T, const T&> && convertible_to<const T&, T> &&
    constructible_from<T, const T> && convertible_to<const T, T>;
}
```
* constructible_from[link /reference/concepts/constructible_from.md]

## 概要

`copy_constructible`は、任意の型`T`がコピー構築可能であること表すコンセプトである。

## モデル

`T`が[オブジェクト型](/reference/type_traits/is_object.md)ならば`v`を`T`の左辺値（`const`付きも含む）もしくは`const T`の右辺値とすると、この`v`について以下の条件を満たす場合に限って型`T`は`copy_constructible`のモデルである。

- `T u = v;`の定義の後では`u`と`v`は等値であること
- `T(v)`は`u`と等値であること

## 例
```cpp example
#include <iostream>
#include <concepts>

template<std::copy_constructible T>
void f(const char* name) {
  std::cout << name << " is copy constructible" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not copy constructible" << std::endl;
}

struct S {
  S(const S&) = delete;
  
  S(int m) : n(m) {}

  int n = 0;
};

struct M {
  M(M&&) = delete;
};

struct C {
  C(const C&) = default;
};

int main() {
  f<int>("int");
  f<S>("S");
  f<M>("M");
  f<C>("C");
}   
```
* std::copy_constructible[color ff0000]

### 出力
```
int is copy constructible
S is not copy constructible
M is not copy constructible
C is copy constructible
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [LWG Issue 3141. `CopyConstructible` doesn't preserve source values](https://wg21.cmeerw.net/lwg/issue3141)
