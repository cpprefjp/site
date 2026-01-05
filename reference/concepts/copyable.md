# copyable
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept copyable =
    copy_constructible<T> &&
    movable<T> &&
    assignable_from<T&, T&> &&
    assignable_from<T&, const T&> &&
    assignable_from<T&, const T>;
}
```
* assignable_from[link /reference/concepts/assignable_from.md]
* movable[link /reference/concepts/movable.md]

## 概要

`copyable`は、任意の型`T`が[`movable`](movable.md)コンセプトを満たし、それに加えてコピー構築・代入が可能であることを表すコンセプトである。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<std::copyable T>
void f(const char* name) {
  std::cout << name << " is copyable" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not copyable" << std::endl;
}


struct copyable {
  copyable(const copyable&) = default;
  copyable& operator=(const copyable&) = default;
};

struct movable {
  movable(movable&&) = default;
  movable& operator=(movable&&) = default;
};

struct not_copyable1 {
  not_copyable1(const not_copyable1&) = delete;
};

struct not_copyable2 {
  not_copyable2& operator=(const not_copyable2&) = delete;
};

int main() {
  f<int>("int");
  f<double>("double");
  f<std::nullptr_t>("std::nullptr_t");
  f<std::size_t>("std::size_t");
  f<copyable>("copyable");

  std::cout << "\n";
  f<void>("void");
  f<movable>("movable");
  f<not_copyable1>("not_copyable1");
  f<not_copyable2>("not_copyable2");
}
```
* std::copyable[color ff0000]

### 出力
```
int is copyable
double is copyable
std::nullptr_t is copyable
std::size_t is copyable
copyable is copyable

void is not copyable
movable is not copyable
not_copyable1 is not copyable
not_copyable2 is not copyable
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
- [P2102R0 Make “implicit expression variations” more explicit (Wording for US185)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2102r0.html)
