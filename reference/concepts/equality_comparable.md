# equality_comparable
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept equality_comparable = /*see below*/;      // (1)

  template<class T, class U>
  concept equality_comparable_with = /*see below*/; // (2)
}
```
* see below[italic]

## 概要
`equality_comparable`及び`equality_comparable_with`は、指定された型`T`もしくは`T, U`の間で`==`演算子による同値比較が可能である事を表すコンセプトである。


## 要件

まず、説明専用のコンセプト`weakly-equality-comparable-with`を次のように定義する

```cpp
//==,!=による2種×2方向の同値比較が可能である
template<class T, class U>
concept weakly-equality-comparable-with =
  requires(const remove_reference_t<T>& t,
           const remove_reference_t<U>& u) {
    { t == u } -> boolean-testable;
    { t != u } -> boolean-testable;
    { u == t } -> boolean-testable;
    { u != t } -> boolean-testable;
  };
```
* boolean-testable[link /reference/concepts/boolean-testable.md]

- (1) : 以下のように定義される

```cpp
template<class T>
concept equality_comparable = weakly-equality-comparable-with<T, T>;
```

- (2) : 以下のように定義される

```cpp
template<class T, class U>
concept equality_comparable_with =
  equality_comparable<T> && equality_comparable<U> &&
  common_reference_with<const remove_reference_t<T>&, const remove_reference_t<U>&> &&
  equality_comparable<
    common_reference_t<
      const remove_reference_t<T>&,
      const remove_reference_t<U>&>> &&
  weakly-equality-comparable-with<T, U>;
```

## モデル

- (1) : `T`のオブジェクト`a, b`について次の条件を満たす場合に限って、型`T`は`equality_comparable`のモデルである。
    - `bool(a == b)`は`a, b`の値が等値である場合に`true`となり、それ以外の場合は`false`となる

- (2) :　`const remove_reference_t<T>, const remove_reference_t<U>`型の左辺値`t, u`及び`C = common_reference_t<const remove_reference_t<T>&, const remove_reference_t<U>&>`について次の条件を満たす場合に限って、型`T, U`は`equality_comparable_with`のモデルである。
    - `bool(t == u) == bool(C(t) == C(u))`が`true`であること

- `weakly-equality-comparable-with` : `const remove_reference_t<T>, const remove_reference_t<U>`型の左辺値`t, u`について次の条件を満たす場合に限って、型`T, U`は`weakly-equality-comparable-with`のモデルである。
    - `t == u, u == t, t != u, u != t`は全て同じ[定義域](/reference/concepts.md)を持つ
    - `bool(u == t) ==  bool(t == u)`が`true`であること
    - `bool(t != u) == !bool(t == u)`が`true`であること
    - `bool(u != t) ==  bool(t != u)`が`true`であること

## 備考

定義内の`t == u`等の各制約式に[等しさを保持](/reference/concepts.md)する事が要求されていることによって、これらコンセプトを満たす`== !=`演算子は推移的かつ対称的である事を表し、要求している。

- 推移律 : `a == b`かつ`b == c`ならば`a == c`
- 対称律 : `a == b`ならば`b == a`

## 例

### equality_comparable

```cpp
#include <iostream>
#include <concepts>
#include <any>

template<typename T>
requires std::equality_comparable<T>
void f(const char* name) {
  std::cout << name << " is equality comparable" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not equality comparable" << std::endl;
}


struct eq_comp {
  int n = 0;

  friend bool operator==(const eq_comp&, const eq_comp&) = default;
};

struct not_eq_comp {
  int n = 0;

  friend bool operator==(const not_eq_comp&, const not_eq_comp&) = delete;
};


int main() {
  f<int>("int");
  f<eq_comp>("eq_comp");

  std::cout << "\n";

  f<std::any>("std::any");
  f<not_eq_comp>("not_eq_comp");
}
```
* std::equality_comparable[color ff0000]
* std::any[link /reference/any/any.md]

#### 出力

```
int is equality comparable
eq_comp is equality comparable

std::any is not equality comparable
not_eq_comp is not equality comparable
```

### equality_comparable_with

```cpp
#include <iostream>
#include <concepts>

template<typename T, typename U>
requires std::equality_comparable_with<T, U>
void f(const char* name1, const char* name2) {
  std::cout << name1 << " is equality comparable with " << name2 << std::endl;
}

template<typename T, typename U>
void f(const char* name1, const char* name2) {
  std::cout << name1 << " is not equality comparable with " << name2 << std::endl;
}

struct S1 {
  int n = 0;

  operator int() const {
    return this->n;
  }

  friend bool operator==(const S1&, const S1&) = default;

  //暗黙変換によりintとして比較されてしまう事を防止
  friend bool operator==(const S1&, int) = delete;
};

struct S2 {
  int m = 0;

  operator int() const {
    return this->m;
  }

  friend bool operator==(const S2&, const S2&) = default;

  //暗黙変換によりintとして比較されてしまう事を防止
  friend bool operator==(const S2&, int) = delete;

  //この演算子によりS1とS2間の全ての同値比較演算子が導出される
  friend bool operator==(const S1& lhs, const S2& rhs) {
    return lhs.n == rhs.m;
  }
};

//std::common_referenceおよびstd::common_reference_withにアダプトする
namespace std {
  template<template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<S1, S2, TQual, UQual> {
    using type = const int&;
  };

  //対称性のために引数順を逆にしたものも定義する
  template<template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<S2, S1, TQual, UQual> {
    using type = const int&;
  };
}


int main() {
  f<int, int>("int", "int");
  f<int, double>("int", "double");
  f<bool, double>("bool", "double");
  f<S1, S2>("S1", "S2");
  f<S2, S1>("S2", "S1");

  std::cout << "\n";
  f<int*, double*>("int*", "double*");
  f<S1, int>("S1", "int");
  f<S2, int>("S2", "int");
}
```
* std::equality_comparable_with[color ff0000]
* basic_common_reference[link /reference/type_traits/basic_common_reference.md]

#### 出力

```
int is equality comparable with int
int is equality comparable with double
bool is equality comparable with double
S1 is equality comparable with S2
S2 is equality comparable with S1

int* is not equality comparable with double*
S1 is not equality comparable with int
S2 is not equality comparable with int
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

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [同値関係 - wikipedia](https://ja.wikipedia.org/wiki/同値関係)
