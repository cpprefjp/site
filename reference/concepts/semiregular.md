# semiregular
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept semiregular = copyable<T> && default_initializable<T>;
}
```
* copyable[link /reference/concepts/copyable.md]
* default_initializable[link /reference/concepts/default_initializable.md]

## 概要

`semiregular`は、任意の型`T`が[`copyable`](./copyable.md)コンセプトを満たし、それに加えてデフォルト構築可能であることを表すコンセプトである。

半正則（*semiregular*）な型とは`int`型などの[基本型](/reference/type_traits/is_fundamental.md)の様に扱うことができる型を表しているが、`==`による等値比較が必ずしも可能ではない。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<std::semiregular T>
void f(const char* name) {
  std::cout << name << " is semiregular" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not semiregular" << std::endl;
}


struct semiregular {
  semiregular() = default;
  semiregular(const semiregular&) = default;
  semiregular& operator=(const semiregular&) = default;
};

struct copyable {
  copyable(const copyable&) = default;
  copyable& operator=(const copyable&) = default;
};

int main() {
  f<int>("int");
  f<double>("double");
  f<std::nullptr_t>("std::nullptr_t");
  f<std::size_t>("std::size_t");
  f<semiregular>("semiregular");

  std::cout << "\n";
  f<void>("void");
  f<copyable>("copyable");
}
```
* std::semiregular[color ff0000]

### 出力
```
int is semiregular
double is semiregular
std::nullptr_t is semiregular
std::size_t is semiregular
semiregular is semiregular

void is not semiregular
copyable is not semiregular
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
- [`regular`](./regular.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
