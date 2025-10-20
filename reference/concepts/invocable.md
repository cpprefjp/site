# invocable
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class F, class... Args>
  concept invocable = requires(F&& f, Args&&... args) {
    invoke(std::forward<F>(f), std::forward<Args>(args)...);
  };

  template<class F, class... Args>
  concept regular_invocable = invocable<F, Args...>;
}
```
* invoke[link /reference/functional/invoke.md]

## 概要

`invocable`及び`regular_invocable`は、任意の関数呼び出し可能な型`F`が引数`Args...`によって関数呼び出し可能であることを表すコンセプトである。

## 等しさの保持

`invocable`コンセプトでは`F`の`Args...`による関数呼び出しが[等しさを保持](/reference/concepts.md)することを要求しない。従って、`invocable`コンセプトのモデルとなる型`F, Args...`は関数呼び出しに際して副作用があっても良く、その出力が内部状態や外部状態に依存していても構わない。

対して、`regular_invocable`コンセプトのモデルとなる`F`の`Args...`による関数呼び出しには[等しさを保持](/reference/concepts.md)することが要求される。従って、`regular_invocable`コンセプトのモデルとなる型`F, Args...`は関数呼び出しに際して副作用を持ってはならず、出力は何かしらの状態に依存してはならない。ただし、このことは構文的に（コンパイル時に）チェックされるものではなく、純粋に意味論的な制約として要求・表明される。

例えば、[乱数・分布生成器](/reference/random.md)はその呼び出しに際して等しさを保持しない（内部に状態を保ち、出力はそれに依存する）ため、`regular_invocable`コンセプトのモデルにはならないが`invocable`コンセプトのモデルとなる。

## 例

### invocable

```cpp example
#include <iostream>
#include <concepts>
#include <random>

template<typename F, typename... Args>
requires std::invocable<F, Args...>
void f(const char* name) {
  std::cout << name << " is invocable" << std::endl;
}

template<typename F, typename... Args>
void f(const char* name) {
  std::cout << name << " is not invocable" << std::endl;
}


void func(int);
auto lambda = [](auto a) { return a; };
auto mut_lambda = [n = 0](auto a) mutable { ++n; return n + a; };

struct invocable {
  template<typename T>
  void operator()(T&& t) const {
    return t;
  }
};

struct not_invocable {};


int main() {
  f<decltype(func), int>("func(int)");
  f<decltype(lambda), int>("lambda(int)");
  f<decltype(lambda), int*>("lambda(int*)");
  f<invocable, int>("invocable(int)");
  f<invocable, int***>("invocable(int***)");

  std::cout << "\n";

  // 内部状態を保ち、等しさを保持しない呼び出し可能な型
  f<decltype(mut_lambda), int>("mut_lambda(int)");
  f<std::mt19937>("std::mt19937()");

  std::cout << "\n";

  f<decltype(func), int*>("func(int*)");
  f<not_invocable>("not_invocable()");
  f<not_invocable, int>("not_invocable(int)");
}
```
* std::invocable[color ff0000]

#### 出力
```
func(int) is invocable
lambda(int) is invocable
lambda(int*) is invocable
invocable(int) is invocable
invocable(int***) is invocable

mut_lambda(int) is invocable
std::mt19937() is invocable

func(int*) is not invocable
not_invocable() is not invocable
not_invocable(int) is not invocable
```

### regular_invocable

```cpp example
#include <iostream>
#include <concepts>
#include <random>

template<typename F, typename... Args>
requires std::regular_invocable<F, Args...>
void f(const char* name) {
  std::cout << name << " is regular_invocable" << std::endl;
}

template<typename F, typename... Args>
void f(const char* name) {
  std::cout << name << " is not regular_invocable" << std::endl;
}


void func(int);
auto lambda = [](auto a) { return a; };
auto mut_lambda = [n = 0](auto a) mutable { ++n; return n + a; };

struct invocable {
  template<typename T>
  void operator()(T&& t) const {
    return t;
  }
};

struct not_invocable {};


int main() {
  f<decltype(func), int>("func(int)");
  f<decltype(lambda), int>("lambda(int)");
  f<decltype(lambda), int*>("lambda(int*)");
  f<invocable, int>("invocable(int)");
  f<invocable, int***>("invocable(int***)");

  std::cout << "\n";
  // 内部状態を保ち、等しさを保持しない呼び出し可能な型
  f<decltype(mut_lambda), int>("mut_lambda(int)");
  f<std::mt19937>("std::mt19937()");
  // これらの型は std::regular_invocable コンセプトのモデルではないが
  // C++構文上では std::invocable との差異を区別しない／できないため
  // それぞれ「XXX is regular_invocable」と出力される。

  std::cout << "\n";
  f<decltype(func), int*>("func(int*)");
  f<not_invocable>("not_invocable()");
  f<not_invocable, int>("not_invocable(int)");
}
```
* std::regular_invocable[color ff0000]


#### 出力
```
func(int) is regular_invocable
lambda(int) is regular_invocable
lambda(int*) is regular_invocable
invocable(int) is regular_invocable
invocable(int***) is regular_invocable

mut_lambda(int) is regular_invocable
std::mt19937() is regular_invocable

func(int*) is not regular_invocable
not_invocable() is not regular_invocable
not_invocable(int) is not regular_invocable
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
- [invoke](/reference/functional/invoke.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
