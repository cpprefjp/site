#is_union (C++11)
```cpp
namespace std {
  template <class T>
  struct is_union;
}
```

##概要
型`T`が共用型かを調べる


##効果
`is_union`は、型`T`が共用型であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##例
```cpp
#include <type_traits>

union u{};

static_assert(std::is_union<u>::value == true, "value == true, u is union");
static_assert(std::is_same<std::is_union<u>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_union<u>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_union<u>() == true, "is_union<u>() == true");

static_assert(std::is_union<int>::value == false, "value == false, int is not union");
static_assert(std::is_same<std::is_union<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_union<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_union<int>() == false, "is_union<int>() == false");

static_assert(std::is_union<const u>::value == true, "const u is union");
static_assert(std::is_union<volatile u>::value == true, "volatile u is union");
static_assert(std::is_union<const volatile u>::value == true, "const volatile u is union");

static_assert(std::is_union<u*>::value == false, "u* is not union");
static_assert(std::is_union<u&>::value == false, "u& is not union");
static_assert(std::is_union<u ()>::value == false, "u () is not union");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.1, 4.7.0
- [Visual C++](/implementation.md#visual_cpp) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](./integral_constant-true_type-false_type.md) が `operator bool()` を持っていないためエラーになる。

