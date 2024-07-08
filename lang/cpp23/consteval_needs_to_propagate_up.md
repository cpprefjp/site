# constexpr関数内でconsteval関数を呼び出せない問題を軽減 [P2564R3]
* cpp23[meta cpp]

<-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要
C++23では、`consteval`呼び出しを含む`constexpr`関数を、条件付きで`consteval`関数と見なすようになる。そうすることで、定数式の文脈での`consteval`関数の使用がよりかんたんになる。

```cpp example
#include <algorithm>

consteval bool is_even(int x) {
  return x % 2 == 0;
}

int main() {
  constexpr int ar[] = {1, 3, 5};

  // consteval関数の非定数呼び出しにより (xは定数ではない)、
  // ラムダ式が暗黙にconstevalとなる
  static_assert(std::ranges::none_of(
    ar,
    [](int x) {
      return is_even(x); // C++20:NG, C++23:OK
    }
  ));

  // ラムダ式を明示的にconstevalにする
  static_assert(std::ranges::none_of(
    ar,
    [](int x) consteval {
      return is_even(x); // C++20:NG, C++23:OK
    }
  ));

  // is_evenは明らかに定数式評価される文脈
  // であるため使用可能
  static_assert(std::ranges::none_of(
    ar,
    is_even // C++20:NG, C++23:OK
  ));
}
```
* std::ranges::none_of[link /reference/algorithm/ranges_none_of.md]


## 仕様
- `constexpr`関数が即時関数の文脈外の`consteval`関数呼び出しを含み、その呼び出しが定数式ではない場合に、その`constexpr`関数は暗黙的に`consteval`関数となる
- 上記の文脈で、即時呼び出しではない`consteval`関数を呼び出す場合、その文脈は暗黙的に`consteval`関数となる

```cpp
consteval int id(int i) { return i; }
constexpr char id(char c) { return c; }

template <typename T>
constexpr int f(T t) {
    return t + id(t);
}

auto a = &f<char>; // OK, f<char>は即時関数ではない
auto b = &f<int>;  // エラー！f<int>は即時関数

static_assert(f(3) == 6); // OK

template <typename T>
constexpr int g(T t) {    // id(42)はすでに定数であるため
    return t + id(42);    // g<int>は即時関数ではない
}

template <typename T, typename F>
constexpr bool is_not(T t, F f) {
    return not f(t);
}

consteval bool is_even(int i) { return i % 2 == 0; }

static_assert(is_not(5, is_even)); // OK

int x = 0;

template <typename T>
constexpr T h(T t = id(x)) { // h<int>は即時関数ではない
    return t;
}

template <typename T>
constexpr T hh() {           // hh<int>は即時関数
    return h<T>();
}

int i = hh<int>(); // 不適格。hh<int>()は即時関数への昇格式である

struct A {
  int x;
  int y = id(x);
};

template <typename T>
constexpr int k(int) {  // k<int>は即時関数ではない
  return A(42).y;       // A(42)は定数式であり、即時関数への昇格がない
}
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 即時関数](/lang/cpp20/immediate_functions.md)


## 参照
- [P2564R3 `consteval` needs to propagate up](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2564r3.html)