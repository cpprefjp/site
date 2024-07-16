# strict_weak_order
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class R, class T, class U>
  concept strict_weak_order = relation<R, T, U>;
}
```
* relation[link /reference/concepts/relation.md]

## 概要

`strict_weak_order`は、型`T, U`の間の[二項関係](/reference/concepts/predicate.md)`R`が狭義の弱順序であることを表すコンセプトである。

## モデル

[`relation`](/reference/concepts/relation.md)のモデルである二項関係`R`は、その引数型`T, U`の間の狭義の弱順序関係を示す場合に限って、`strict_weak_order`のモデルである。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<typename R, typename T, typename U>
requires std::strict_weak_order<R, T, U>
void f(const char* name, const char* tname, const char* uname) {
  std::cout << name << " is strict weak order between " << tname << " and " << uname << std::endl;
}

template<typename R, typename T, typename U>
void f(const char* name, const char* tname, const char* uname) {
  std::cout << name << " is not strict weak order between " << tname << " and " << uname << std::endl;
}


struct S1 {
  int n = 0;
};

struct S2 {
  short m = 0;
};

// S1とS2の間の順序関係
struct strict_weak_order_s1s2 {
  
  bool operator()(S1 lhs, S1 rhs) const {
    return lhs.n < rhs.n;
  }

  bool operator()(S2 lhs, S2 rhs ) const {
    return lhs.m < rhs.m;
  }

  bool operator()(S1 lhs, S2 rhs) const {
    return lhs.n < rhs.m;
  }
  
  bool operator()(S2 lhs, S1 rhs) const {
    return lhs.m < rhs.n;
  }
};

int main() {
  f<strict_weak_order_s1s2, S1, S2>("strict_weak_order_s1s2", "S1", "S2");
  f<strict_weak_order_s1s2, S2, S1>("strict_weak_order_s1s2", "S2", "S1");
}
```
* std::strict_weak_order[color ff0000]

### 出力
```
strict_weak_order_s1s2 is strict weak order between S1 and S2
strict_weak_order_s1s2 is strict weak order between S2 and S1
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
- [狭義の弱順序](https://cpprefjp.github.io/reference/algorithm.html#strict-weak-ordering)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [二項関係 - wikipedia](https://ja.wikipedia.org/wiki/二項関係)
