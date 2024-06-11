# equivalence_relation
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class R, class T, class U>
  concept equivalence_relation = relation<R, T, U>;
}
```
* relation[link /reference/concepts/relation.md]

## 概要

`equivalence_relation`は、型`T, U`の間の[二項関係](/reference/concepts/predicate.md)`R`が同値関係であることを表すコンセプトである。

## モデル

[`relation`](/reference/concepts/relation.md)のモデルである二項関係`R`は、その引数型`T, U`の間の同値関係を示す場合に限って、`equivalence_relation`のモデルである。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<typename R, typename T, typename U>
requires std::equivalence_relation<R, T, U>
void f(const char* name, const char* tname, const char* uname) {
  std::cout << name << " is equivalence relation between " << tname << " and " << uname << std::endl;
}

template<typename R, typename T, typename U>
void f(const char* name, const char* tname, const char* uname) {
  std::cout << name << " is not equivalence relation between " << tname << " and " << uname << std::endl;
}


struct S1 {
  int n = 0;
};

struct S2 {
  short m = 0;
};

// S1とS2の間の同値関係
struct equivalence_relation_s1s2 {
  
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

int main() {
  f<equivalence_relation_s1s2, S1, S2>("equivalence_relation_s1s2", "S1", "S2");
  f<equivalence_relation_s1s2, S2, S1>("equivalence_relation_s1s2", "S2", "S1");
}
```
* std::equivalence_relation[color ff0000]

### 出力
```
equivalence_relation_s1s2 is equivalence relation between S1 and S2
equivalence_relation_s1s2 is equivalence relation between S2 and S1
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
