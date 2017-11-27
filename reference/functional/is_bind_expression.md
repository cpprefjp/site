# is_bind_expression
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_bind_expression;

  template <class T>
  constexpr bool is_bind_expression_v = is_bind_expression<T>::value; // C++17
}
```

## 概要
型 `T` が `bind()` の呼出し結果かどうかを判別する


## 要件
`is_bind_expression`は、型 `T `が `std::bind()` の戻り値であれば [`true_type`](/reference/type_traits/true_type.md) から派生し、そうでなければ [`false_type`](/reference/type_traits/false_type.md) から派生する。


## 例

```cpp example
#include <functional>

static_assert(
  std::is_bind_expression<
    decltype(std::bind(std::less<int>(), std::placeholders::_1, 3))
  >::value,
  "a bind expression");

static_assert(
  !std::is_bind_expression<decltype(std::less<int>()(2, 3))>::value,
  "not a bind expression");

int main() {}
```
* std::is_bind_expression[color ff0000]
* std::less[link less.md]
* std::placeholders::_1[link placeholders.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
