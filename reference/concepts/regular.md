# regular
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept regular = semiregular<T> && equality_comparable<T>;
}
```
* equality_comparable[link /reference/concepts/equality_comparable.md]
* semiregular[link /reference/concepts/semiregular.md]

## 概要

`regular`は、任意の型`T`が[`semiregular`](./semiregular.md)コンセプトを満たし、それに加えて等値比較可能であることを表すコンセプトである。

## 正則性

正則（*regular*）な型とはつまり以下の性質を備えた型である。

- ムーブ構築・代入可能
- コピー構築・代入可能
- デフォルト構築可能
- `swap`可能
- `== !=`による等値比較可能

このような正則な型とは、`int`型などの[基本型](/reference/type_traits/is_fundamental.md)の様に扱うことのできる型を表している。

ここから等値比較可能という性質を弱めたものは、[半正則](./semiregular.md)な型と呼ばれる。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<std::regular T>
void f(const char* name) {
  std::cout << name << " is regular" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not regular" << std::endl;
}


struct regular {
  regular() = default;
  regular(const regular&) = default;
  regular& operator=(const regular&) = default;
  
  bool operator==(const regular&) const = default;
};

struct semiregular {
  semiregular() = default;
  semiregular(const semiregular&) = default;
  semiregular& operator=(const semiregular&) = default;
};

int main() {
  f<int>("int");
  f<double>("double");
  f<std::nullptr_t>("std::nullptr_t");
  f<std::size_t>("std::size_t");
  f<regular>("regular");

  std::cout << "\n";
  f<void>("void");
  f<semiregular>("semiregular");
}
```
* std::regular[color ff0000]

### 出力
```
int is regular
double is regular
std::nullptr_t is regular
std::size_t is regular
regular is regular

void is not regular
semiregular is not regular
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
