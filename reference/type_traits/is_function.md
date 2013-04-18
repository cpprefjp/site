#is_function
```cpp
namespace std {
  template <class T>
  struct is_function;
}
```

##概要

<b>型Tが関数型か調べる</b>


##効果

`is_function`は、型`T`が関数型であるならば[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生する。


##例

```cpp
#include <type_traits>

typedef void f();

static_assert(std::is_function<f>::value == true, "value == true, f is function");
static_assert(std::is_same<std::is_function<f>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_function<f>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_function<f>() == true, "is_function<f>() == true");

static_assert(std::is_function<int>::value == false, "value == false, int is not function");
static_assert(std::is_same<std::is_function<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_function<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_function<int>() == false, "is_function<int>() == false");

static_assert(std::is_function<const f>::value == true, "const f is function");
static_assert(std::is_function<volatile f>::value == true, "volatile f is function");
static_assert(std::is_function<const volatile f>::value == true, "const volatile f is function");

static_assert(std::is_function<f*>::value == false, "f* is not function");
static_assert(std::is_function<f&>::value == false, "f& is not function");
static_assert(std::is_function<f&&>::value == false, "f&& is not function");

int main(){}
```

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3, 4.6.1, 4.7.0
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [integral_constant](/reference/type_traits/integral_constant-true_type-false_type.md) が operator bool を持っていないためエラーになる。また、Visual C++ 10.0 はコンパイラのバグのために関数への rvalue reference を用いるとエラーになる。

