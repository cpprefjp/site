# default_initializable
* concepts[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept default_initializable = /*see below*/;
}
```
* see below[italic]

## 概要

`default_initializable`は、任意の型`T`がデフォルト構築可能であること表すコンセプトである。


## 要件

まず、説明専用の変数テンプレート`is-default-initializable<T>`を、型`T`について`T t;`のような変数定義が有効である場合に`true`を示す変数テンプレートとして定義する。

```cpp
template<class T>
inline constexpr bool is-default-initializable;
```

`default_initializable`コンセプトは以下のように定義される。

```cpp
template<class T>
concept default_initializable = constructible_from<T> &&
                                requires { T{}; } &&
                                is-default-initializable<T>;
```
* constructible_from[link /reference/concepts/constructible_from.md]


## 例
```cpp example
#include <iostream>
#include <concepts>

template<std::default_initializable T>
void f(const char* name) {
  std::cout << name << " is default initializable" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not default initializable" << std::endl;
}

struct S {
  S() = delete;
  
  S(int m) : n(m) {}

  int n = 0;
};

int main() {
  f<int>("int");
  f<S>("S");
}
```
* std::default_initializable[color ff0000]

### 出力
```
int is default initializable
S is not default initializable
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
- [`is_default_constructible`](/reference/type_traits/is_default_constructible.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [LWG Issue 3149. DefaultConstructible should require default initialization](https://wg21.cmeerw.net/lwg/issue3149)
