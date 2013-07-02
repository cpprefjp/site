#is_signed(C++11)
```cpp
namespace std {
  template <class T>
  struct is_signed;
}
```

##概要
型`T`が符号付き算術型か調べる


##効果
`is_signed`は、型`T`が符号付き算術型 (cv修飾を許容する) であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
型`T`が符号付き算術型ならば、`T(-1) < T(0)` が成立する。


##例
```cpp
#include <type_traits>

static_assert(std::is_signed<int>::value == true, "value == true, int is signed");
static_assert(std::is_same<std::is_signed<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_signed<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_signed<int>() == true, "is_signed<int>() == true");

static_assert(std::is_signed<unsigned int>::value == false, "value == false, unsigned int is not signed");
static_assert(std::is_same<std::is_signed<unsigned int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_signed<unsigned int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_signed<unsigned int>() == false, "is_signed<unsigned int>() == false");

static_assert(std::is_signed<const volatile int>::value == true, "value == true, const volatile int is signed");
static_assert(std::is_signed<int&>::value == false, "value == true, int& is not signed");

class c{};
static_assert(std::is_signed<float>::value == true, "value == true, float is signed");
static_assert(std::is_signed<c>::value == false, "value == true, class is not signed");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation#visual_cpp.md) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `*integral_constant` が `operator bool()` を持っていないためエラーになる。


