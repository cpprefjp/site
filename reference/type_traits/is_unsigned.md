#is_unsigned(C++11)
```cpp
namespace std {
  template <class T>
  struct is_unsigned;
}
```

##概要
型`T`が符号なし算術型か調べる


##効果
`is_unsigned`は、型`T`が符号なし算術型 (cv修飾を許容する) であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
`T`が符号なし算術型ならば、`T(0) < T(-1)` が成立する。


##例
```cpp
#include <type_traits>

static_assert(std::is_unsigned<unsigned int>::value == true, "value == true, unsigned int is unsigned");
static_assert(std::is_same<std::is_unsigned<unsigned int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_unsigned<unsigned int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_unsigned<unsigned int>() == true, "is_unsigned<unsigned int>() == true");

static_assert(std::is_unsigned<int>::value == false, "value == false, int is not unsigned");
static_assert(std::is_same<std::is_unsigned<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_unsigned<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_unsigned<int>() == false, "is_unsigned<int>() == false");

static_assert(std::is_unsigned<const volatile unsigned int>::value == true, "value == true, const volatile unsigned int is unsigned");
static_assert(std::is_unsigned<unsigned int&>::value == false, "value == true, unsigned int& is not unsigned");

class c{};
static_assert(std::is_unsigned<float>::value == false, "value == true, float is not unsigned");
static_assert(std::is_unsigned<c>::value == false, "value == true, class is not unsigned");

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
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


