# is_enum
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_enum;

  template <class T>
  constexpr bool is_enum_v = is_enum<T>::value; // C++17
}
```

## 概要
型`T`が列挙型かを調べる


## 効果
`is_enum`は、型`T`が列挙型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp
#include <type_traits>

enum e {};
enum class ec {};

static_assert(std::is_enum<e>::value == true, "value == true, e is enum");
static_assert(std::is_same<std::is_enum<e>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_enum<e>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_enum<e>() == true, "is_enum<e>() == true");

static_assert(std::is_enum<int>::value == false, "value == false, int is not enum");
static_assert(std::is_same<std::is_enum<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_enum<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_enum<int>() == false, "is_enum<int>() == false");

static_assert(std::is_enum<const e>::value == true, "const e is enum");
static_assert(std::is_enum<volatile e>::value == true, "volatile e is enum");
static_assert(std::is_enum<const volatile e>::value == true, "const volatile e is enum");
static_assert(std::is_enum<ec>::value == true, "ec is enum");

static_assert(std::is_enum<e*>::value == false, "e* is not enum");
static_assert(std::is_enum<e&>::value == false, "e& is not enum");
static_assert(std::is_enum<e ()>::value == false, "e () is not enum");
static_assert(std::is_enum<e [1]>::value == false, "e [1] is not enum");

int main(){}
```
* std::is_enum[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.1, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](integral_constant.md) が `operator bool` を持っていないためエラーになる。また、GCC 4.3.4 および Visual C++ 10.0 は `enum class` に対応していないためエラーになる。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
