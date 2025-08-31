# totally_ordered
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept totally_ordered =
    equality_comparable<T> &&
    partially-ordered-with<T, T>;

  template<class T, class U>
  concept totally_ordered_with =
    totally_ordered<T> && totally_ordered<U> &&
    equality_comparable_with<T, U> &&
    totally_ordered<
      common_reference_t<
        const remove_reference_t<T>&,
        const remove_reference_t<U>&>> &&
    partially-ordered-with<T, U>;
}
```
* equality_comparable_with[link /reference/concepts/equality_comparable.md]
* partially-ordered-with[link /reference/compare/three_way_comparable.md]

## 概要
`totally_ordered`及び`totally_ordered_with`は、指定された型`T`もしくは`T, U`の間で`< <= > >=`の演算子による比較が可能であり、その順序付けが全順序の要件を満たしている事を表すコンセプトである。

## モデル

- (1) : `const remove_reference_t<T>`型の左辺値`a, b, c`について次の条件を満たす場合に限って、型`T`は`totally_ordered`のモデルである。
    - `bool(a < b)`、`bool(a > b)`、`bool(a == b)`はいずれか1つだけが`true`となる
    - `bool(a < b)`かつ`bool(b < c)`ならば、`bool(a < c)`
    - `bool(a <= b) == !bool(b < a)`が`true`であること
    - `bool(a >= b) == !bool(a < b)`が`true`であること

- (2) : `const remove_reference_t<T>, const remove_reference_t<U>`型の左辺値`t, u`及び`C = common_reference_t<const remove_reference_t<T>&, const remove_reference_t<U>&>`について次の条件を満たす場合に限って、型`T, U`は`totally_ordered_with`のモデルである。
    - `bool(t <  u) == bool(C(t) <  C(u))`が`true`であること
    - `bool(t >  u) == bool(C(t) >  C(u))`が`true`であること
    - `bool(t >= u) == bool(C(t) >= C(u))`が`true`であること
    - `bool(t <= u) == bool(C(t) <= C(u))`が`true`であること
    - `bool(u >  t) == bool(C(u) >  C(t))`が`true`であること
    - `bool(u <  t) == bool(C(u) <  C(t))`が`true`であること
    - `bool(u <= t) == bool(C(u) <= C(t))`が`true`であること
    - `bool(u >= t) == bool(C(u) >= C(t))`が`true`であること

## 例

### totally_ordered

```cpp
#include <iostream>
#include <concepts>

template<typename T>
requires std::totally_ordered<T>
void f(const char* name) {
  std::cout << name << " is totally ordered" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not totally ordered" << std::endl;
}


struct ordered {
  int n = 0;

  friend auto operator<=>(const ordered&, const ordered&) = default;
};


struct not_ordered {
  int n = 0;

  bool operator==(const not_ordered&) const = default;
};


int main() {
  f<int>("int");
  f<double>("double");
  f<ordered>("ordered");

  std::cout << "\n";

  f<not_ordered>("not_ordered");
}
```
* std::totally_ordered[color ff0000]

#### 出力

```
int is totally ordered
double is totally ordered
ordered is totally ordered

not_ordered is not totally ordered
```

### totally_ordered_with

```cpp
#include <iostream>
#include <concepts>

template<typename T, typename U>
requires std::totally_ordered_with<T, U>
void f(const char* name1, const char* name2) {
  std::cout << name1 << " is totally ordered with " << name2 << std::endl;
}

template<typename T, typename U>
void f(const char* name1, const char* name2) {
  std::cout << name1 << " is not totally ordered with " << name2 << std::endl;
}


struct S1 {
  int n = 0;

  operator int() const {
    return this->n;
  }

  friend auto operator<=>(const S1&, const S1&) = default;

  //暗黙変換によりintとして比較されてしまう事を防止
  friend auto operator<=>(const S1&, int) = delete;
};

struct S2 {
  int m = 0;

  operator int() const {
    return this->m;
  }

  friend auto operator<=>(const S2&, const S2&) = default;

  //暗黙変換によりintとして比較されてしまう事を防止
  friend auto operator<=>(const S2&, int) = delete;

  //この演算子によりS1とS2間の全ての比較演算子が導出される
  friend auto operator<=>(const S1& lhs, const S2& rhs) {
    return lhs.n <=> rhs.m;
  }

  //この演算子によりS1とS2間の全ての同値比較演算子が導出される
  bool operator==(const S1& rhs) {
    return this->m == rhs.n;
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
* std::totally_ordered_with[color ff0000]
* basic_common_reference[link /reference/type_traits/basic_common_reference.md]

#### 出力

```
int is totally ordered with int
int is totally ordered with double
bool is totally ordered with double
S1 is totally ordered with S2
S2 is totally ordered with S1

int* is not totally ordered with double*
S1 is not totally ordered with int
S2 is not totally ordered with int
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
- [LWG Issue 3329. `totally_ordered_with` both directly and indirectly requires `common_reference_with`](https://wg21.cmeerw.net/lwg/issue3329)
- [LWG Issue 3331. Define `totally_ordered/_with` in terms of `partially-ordered-with`](https://wg21.cmeerw.net/lwg/issue3331)
