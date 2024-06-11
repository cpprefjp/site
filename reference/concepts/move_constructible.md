# move_constructible
* concepts[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept move_constructible = constructible_from<T, T> && convertible_to<T, T>;
}
```
* constructible_from[link /reference/concepts/constructible_from.md]
* convertible_to[link /reference/concepts/convertible_to.md]

## 概要

`move_constructible`は、任意の型`T`がムーブ構築可能であること表すコンセプトである。

## モデル

`T`が[オブジェクト型](/reference/type_traits/is_object.md)ならば`rv`を`T`の右辺値、`u2`を`rv`と等値な`T`のオブジェクトとすると、この`rv, u2`について以下の条件を満たす場合に限って型`T`は`move_constructible`のモデルである。

- `T u = rv;`の定義の後では`u`と`u2`は等値であること
- `T(rv)`は`u2`と等値であること
- `T`が`const`ではないのであれば、上記の2つの条件内の式の後の`rv`は有効だが未規定な状態となる。そうでなければ`rv`は変更されない。
    - 標準ライブラリの型のオブジェクトはムーブされた後では有効だが未規定な状態となる。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<std::move_constructible T>
void f(const char* name) {
  std::cout << name << " is move constructible" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not move constructible" << std::endl;
}

struct S {
  S(S&&) = delete;
  
  S(int m) : n(m) {}

  int n = 0;
};

struct M {
  M(M&&) = default;
};

int main() {
  f<int>("int");
  f<S>("S");
  f<M>("M");
}
```
* std::move_constructible[color ff0000]

### 出力
```
int is move constructible
S is not move constructible
M is move constructible
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
- [`is_move_constructible`](/reference/type_traits/is_move_constructible.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)



