# predicate
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class F, class... Args>
  concept predicate =
    regular_invocable<F, Args...> && boolean-testable<invoke_result_t<F, Args...>>;
}
```
* boolean-testable[link /reference/concepts/boolean-testable.md]

## 概要

`predicate`は、任意の関数呼び出し可能な型`F`が引数`Args...`によって関数呼び出し可能（[`regular_invocable`](/reference/concepts/invocable.md)）であり、その戻り値型が`bool`に変換可能であることを表すコンセプトである。

`predicate`のモデルとなる`F`はその引数`Args...`に対しての述語（*predicate*）と呼ばれ、（[`<algorithm>`](/reference/algorithm.md)の関数などにおいて）引数がある条件を満たしているかを判定するものとして利用される。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <random>

template<typename F, typename... Args>
requires std::predicate<F, Args...>
void f(const char* name) {
  std::cout << name << " is predicate" << std::endl;
}

template<typename F, typename... Args>
void f(const char* name) {
  std::cout << name << " is not predicate" << std::endl;
}


bool func1(int);
int  func2(int);
int* func3(int);
auto lambda = [](auto a) { return a < 10; };

struct predicate {
  bool operator()(int n) const {
    return n < 10;
  }
};

struct not_predicate {
  void operator()(int) {
  }
};


int main() {
  f<decltype(func1), int>("func1(int)");
  f<decltype(func2), int>("func2(int)");
  f<decltype(func3), int>("func3(int)");
  f<decltype(lambda), int>("lambda(int)");
  f<std::mt19937>("std::mt19937()");
  f<predicate, int>("predicate(int)");


  std::cout << "\n";
  f<not_predicate, int>("not_predicate(int)");
}
```
* std::predicate[color ff0000]

### 出力
```
func1(int) is predicate
func2(int) is predicate
func3(int) is predicate
lambda(int) is predicate
std::mt19937() is predicate
predicate(int) is predicate

not_predicate(int) is not predicate
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
