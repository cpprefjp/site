# relation
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class R, class T, class U>
  concept relation =
    predicate<R, T, T> && predicate<R, U, U> &&
    predicate<R, T, U> && predicate<R, U, T>;
}
```
* predicate[link predicate.md]

## 概要

`relation`は、任意の[述語](/reference/concepts/predicate.md)`R`が型`T, U`の間の二項関係にあることを表すコンセプトである。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<typename R, typename T, typename U>
requires std::relation<R, T, U>
void f(const char* name, const char* tname, const char* uname) {
  std::cout << name << " is relation between " << tname << " and " << uname << std::endl;
}

template<typename R, typename T, typename U>
void f(const char* name, const char* tname, const char* uname) {
  std::cout << name << " is not relation between " << tname << " and " << uname << std::endl;
}


struct S1 {
  int n = 0;
};

struct S2 {
  short m = 0;
};

// S1とS2の間の同値関係
struct relation_s1s2 {
  
  bool operator()(S1 lhs, S1 rhs) const {
    return lhs.n == rhs.n;
  }

  bool operator()(S2 lhs, S2 rhs ) const {
    return lhs.m == rhs.m;
  }

  bool operator()(S1 lhs, S2 rhs) const {
    return lhs.n == rhs.m;
  }
  
  bool operator()(S2 lhs, S1 rhs) const {
    return lhs.m == rhs.n;
  }
};

// 単にS1とS2の間の述語であるだけではrelationではない
struct not_relation_s1s2 {

  bool operator()(S1 lhs, S2 rhs) const {
    return lhs.n == rhs.m;
  }
  
  bool operator()(S2 lhs, S1 rhs) const {
    return lhs.m == rhs.n;
  }
};

int main() {
  f<relation_s1s2, S1, S2>("relation_s1s2", "S1", "S2");
  f<not_relation_s1s2, S1, S2>("not_relation_s1s2", "S1", "S2");
}
```
* std::relation[color ff0000]

### 出力
```
relation_s1s2 is relation between S1 and S2
not_relation_s1s2 is not relation between S1 and S2
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
- [P1248R1 Remove `CommonReference` requirement from `StrictWeakOrdering` (a.k.a Fixing Relations)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1248r1.html)
- [二項関係 - wikipedia](https://ja.wikipedia.org/wiki/二項関係)
