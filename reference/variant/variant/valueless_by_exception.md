# valueless_by_exception
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr bool valueless_by_exception() const noexcept;
```

## 概要
例外によって値を持たない状態になっているかを判定する。

このクラスは、保持する型と値を切り替える代入操作をする際に例外が発生した場合、元の状態には戻さず空になる可能性がある (必ず空になるわけではない)。そのような状況で空になっていることを、本関数で判定できる。


## 戻り値
有効な値を保持している場合は`false`を返し、そうでない場合は`true`を返す。


## 備考
- このクラスの元となった[Boost Variant Library](https://boost.org/libs/variant)の`variant`クラスは、「決して空にならない保証 ("Never-Empty" Guarantee)」をもっているが、本クラスにはそのような保証がないため、新たな型の代入操作で例外が発生した場合に空になる可能性がある
- `variant<int, float>`のように直接的に例外を送出しない型のみの場合でも、[`emplace()`](emplace.md)操作で例外が送出される可能性がある：
    ```cpp
    struct S { operator int() { throw 42; }};
    variant<float, int> v = 12.f;
    try {
      v.emplace<1>(S());
    }
    catch (...) {
      if (v.valueless_by_exception()) {
        // …
      }
    }
    ```
    * v.valueless_by_exception()[color ff0000]
    * v.emplace[link emplace.md]


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <variant>

struct AlwaysThrow {
  AlwaysThrow() = default;

  AlwaysThrow(const AlwaysThrow&) {
    throw std::exception();
  }

  AlwaysThrow(AlwaysThrow&&) {
    throw std::exception();
  }

  AlwaysThrow& operator=(const AlwaysThrow&) {
    throw std::exception();
  }

  AlwaysThrow& operator=(AlwaysThrow&&) {
    throw std::exception();
  }
};

int main()
{
  std::variant<int, AlwaysThrow> v = 0;

  try {
    assert(!v.valueless_by_exception());

    v = AlwaysThrow{}; // 例外発生
    assert(false);
  }
  catch (...) {
    // vが空になる可能性がある
    if (v.valueless_by_exception()) {
      std::cout << "empty" << std::endl;
      assert(v.index() == std::variant_npos);
    }
    else {
      std::cout << "not empty" << std::endl;
    }
  }
}
```
* valueless_by_exception()[color ff0000]
* std::exception[link /reference/exception/exception.md]
* v.index()[link index.md]
* std::variant_npos[link /reference/variant/variant_npos.md]

### 出力例
```
empty
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
