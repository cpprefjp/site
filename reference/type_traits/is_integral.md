#is_integral
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_integral;
}
```

##概要
型`T`が整数型かを調べる


##効果
`is_integral`は、型`T`が整数型(cv修飾も許容される)であれば[`true_type`](integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](integral_constant-true_type-false_type.md)から派生する。

以下のような型が、整数型として判定される：

- `bool`
- `char`
- `char16_t`
- `char32_t`
- `wchar_t`
- `short`
- `int`
- `long`
- `long long`

`enum`は整数型とは判定されない。

##例
```cpp
#include <type_traits>

static_assert(std::is_integral<int>::value == true, "value == true, int is integral");
static_assert(std::is_same<std::is_integral<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_integral<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_integral<int>() == true, "is_integral<int>() == true");

static_assert(std::is_integral<int*>::value == false, "value == false, int* is not integral");
static_assert(std::is_same<std::is_integral<int*>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_integral<int*>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_integral<int*>() == false, "is_integral<int*>() == false");

static_assert(std::is_integral<bool>::value == true, "bool is integral");
static_assert(std::is_integral<char>::value == true, "char is integral");
static_assert(std::is_integral<char32_t>::value == true, "char32_t is integral");
static_assert(std::is_integral<const long long>::value == true, "const long long is integral");
static_assert(std::is_integral<volatile unsigned>::value == true, "volatile unsigned is integral");

enum my_enum{};
static_assert(std::is_integral<my_enum>::value == false, "my_enum is not integral");
static_assert(std::is_integral<int&>::value == false, "int& is not integral");
static_assert(std::is_integral<int[1]>::value == false, "int[1] is not integral");
static_assert(std::is_integral<int ()>::value == false, "int () is not integral");
static_assert(std::is_integral<float>::value == false, "float is not integral");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- GCC, C++11 mode: 4.3.4, 4.5.3, 4.6.1, 4.7.2
- Visual C++ 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](integral_constant-true_type-false_type.md) が `operator bool()` を持っていないためエラーになる。


