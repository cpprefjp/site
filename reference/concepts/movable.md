# movable
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept movable = is_object_v<T> &&
                    move_constructible<T> &&
                    assignable_from<T&, T> &&
                    swappable<T>;
}
```
* assignable_from[link /reference/concepts/assignable_from.md]
* swappable[link /reference/concepts/swappable.md]

## 概要

`movable`は、任意の型`T`がオブジェクト型かつムーブ構築・代入が可能であることを表すコンセプトである。

## 備考

意味論上はムーブ構築可能(`move_constructible<T>`)かつムーブ代入可能(`assignable_from<T&, T>`)であれば結果として必然的に[`swap`](/reference/concepts/swap.md)可能となるにもかかわらず、本コンセプト定義の制約式は[`swappable`](/reference/concepts/swappable.md)コンセプトを明示的に含んでいる。

オブジェクトに対する基本操作としては「`swap`可能」がもっとも原始的と考えられるため、ムーブ可能を表すコンセプトの制約式に`swappable`コンセプトを含めることで、そのような「`swap`可能->ムーブ可能->コピー可能」という基本操作の関係性を、コンセプトにおける包摂関係として表現している。

## 例
```cpp example
#include <iostream>
#include <concepts>

template<std::movable T>
void f(const char* name) {
  std::cout << name << " is movable" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not movable" << std::endl;
}


struct movable {
  movable(movable&&) = default;
  movable& operator=(movable&&) = default;
};

struct not_movable1 {
  not_movable1(not_movable1&&) = delete;
};

struct not_movable2 {
  not_movable2& operator=(not_movable2&&) = delete;
};

int main() {
  f<int>("int");
  f<double>("double");
  f<std::nullptr_t>("std::nullptr_t");
  f<std::size_t>("std::size_t");
  f<movable>("movable");

  std::cout << "\n";
  f<void>("void");
  f<not_movable1>("not_movable1");
  f<not_movable2>("not_movable2");
}
```
* std::movable[color ff0000]

### 出力
```
int is movable
double is movable
std::nullptr_t is movable
std::size_t is movable
movable is movable

void is not movable
not_movable1 is not movable
not_movable2 is not movable
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
- [値指向なコンセプトの説明文面を修正 Pull Request #929 - cpprefjp/site](https://github.com/cpprefjp/site/pull/929)
