#is_bind_expression
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_bind_expression;
}
```

##概要
型 `T` が `bind()` の呼出し結果かどうかを判別する


##要件
`is_bind_expression`は、型 `T `が `std::bind()` の戻り値であれば [`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md) から派生し、そうでなければ [`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md) から派生する。


##例

```cpp
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

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc):
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照


