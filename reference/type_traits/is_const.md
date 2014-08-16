#is_const (C++11)
```cpp
namespace std {
  template <class T>
  struct is_const;
}
```

##概要
型`T`が`const`修飾型か調べる。`const`修飾型は、`const` および `const volatile` を含む。


##効果
`is_const`は、型`T`が`const`修飾型であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
参照型は、`const`修飾型でない。


##例
```cpp
#include <type_traits>

static_assert(std::is_const<const int>::value == true, "value == true, const int is const-qualified");
static_assert(std::is_same<std::is_const<const int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_const<const int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_const<const int>() == true, "is_const<const int>() == true");

static_assert(std::is_const<int>::value == false, "value == false, int is not const-qualified");
static_assert(std::is_same<std::is_const<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_const<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_const<int>() == false, "is_const<int>() == false");

static_assert(std::is_const<const volatile int>::value == true, "value == true, const volatile int is const-qualified");
static_assert(std::is_const<const int&>::value == false, "value == true, const int& is not const-qualified");

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
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


