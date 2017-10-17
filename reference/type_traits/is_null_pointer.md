# is_null_pointer
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_null_pointer;

  template <class T>
  constexpr bool is_null_pointer_v = is_null_pointer<T>::value; // C++17
}
```

## 概要
型`T`が[`nullptr_t`](/reference/cstddef/nullptr_t.md)か調べる


## 効果
`is_null_pointer`は、型`T`が[`nullptr_t`](/reference/cstddef/nullptr_t.md)であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp
#include <type_traits>

static_assert(std::is_null_pointer<std::nullptr_t>::value == true,
              "value == true, nullptr_t is nullptr type");
static_assert(std::is_same<std::is_null_pointer<std::nullptr_t>::value_type, bool>::value,
              "value_type == bool");
static_assert(std::is_same<std::is_null_pointer<std::nullptr_t>::type, std::true_type>::value,
              "type == true_type");
static_assert(std::is_null_pointer<std::nullptr_t>() == true,
              "is_null_pointer<nullptr_t>() == true");

static_assert(std::is_null_pointer<const std::nullptr_t>::value == true,
              "value == false, const nullptr_t is nullptr type");

static_assert(std::is_null_pointer<int>::value == false,
              "value == false, int isn't nullptr type");

int main(){}
```
* std::is_null_pointer[color ff0000]
* std::nullptr_t[link /reference/cstddef/nullptr_t.md]

### 出力
```
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.4
- [GCC, C++14 mode](/implementation.md#gcc): 4.9
- [Visual C++](/implementation.md#visual_cpp): 14.0


## 参照
- [LWG Issue 2247. Type traits and `std::nullptr_t`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2247)
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
