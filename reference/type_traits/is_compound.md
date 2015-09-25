#is_compound
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_compound;
}
```

##概要
型`T`が複合型 (3.9.2 Compound types) か調べる。複合型は、配列型、関数型、ポインタ型、参照型、クラス型、共用型、列挙型、メンバポインタ型、およびそれらのcv修飾を含む。


##効果
`is_compound`は、型`T`が複合型であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
複合型は、すべての型の集合から、単純型の集合を除いたものに等しい。


##例
```cpp
#include <type_traits>

static_assert(std::is_compound<int*>::value == true, "value == true, int* is compound");
static_assert(std::is_same<std::is_compound<int*>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_compound<int*>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_compound<int*>() == true, "is_compound<int*>() == true");

static_assert(std::is_compound<void>::value == false, "value == false, void is not compound");
static_assert(std::is_same<std::is_compound<void>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_compound<void>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_compound<void>() == false, "is_compound<void>() == false");

enum e{};
class c{};
union u{};
static_assert(std::is_compound<e>::value == true, "enum is compound");
static_assert(std::is_compound<c>::value == true, "class is compound");
static_assert(std::is_compound<u>::value == true, "union is compound");
static_assert(std::is_compound<int* const volatile>::value == true, "int* const volatile is compound");
static_assert(std::is_compound<int[1]>::value == true, "int[1] is compound");
static_assert(std::is_compound<int&>::value == true, "int& is not compound");
static_assert(std::is_compound<int ()>::value == true, "int () is not compound");
static_assert(std::is_compound<std::nullptr_t>::value == false, "std::nullptr_t is not compound");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool` を持っていないためエラーになる。

