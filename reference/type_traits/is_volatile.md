#is_volatile
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_volatile;
}
```

##概要
型`T`が`volatile`修飾型か調べる。`volatile`修飾型は、`volatile` および `const volatile` を含む。


##効果
`is_volatile`は、型`T`が`volatile`修飾型であるならば[`true_type`](integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](integral_constant-true_type-false_type.md)から派生する。


##備考
参照型は、`volatile`修飾型でない。


##例
```cpp
#include <type_traits>

static_assert(std::is_volatile<volatile int>::value == true, "value == true, volatile int is volatile-qualified");
static_assert(std::is_same<std::is_volatile<volatile int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_volatile<volatile int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_volatile<volatile int>() == true, "is_volatile<volatile int>() == true");

static_assert(std::is_volatile<int>::value == false, "value == false, int is not volatile-qualified");
static_assert(std::is_same<std::is_volatile<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_volatile<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_volatile<int>() == false, "is_volatile<int>() == false");

static_assert(std::is_volatile<const volatile int>::value == true, "value == true, const volatile int is volatile-qualified");
static_assert(std::is_volatile<volatile int&>::value == false, "value == true, volatile int& is not volatile-qualified");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。



