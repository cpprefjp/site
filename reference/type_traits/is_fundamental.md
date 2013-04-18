#is_fundamental
```cpp
namespace std {  template <class T>  struct is_fundamental;}
```

##概要

<b>型Tが単純型 (3.9.1 Fundamental types) か調べる単純型は</b><b>、</b><b>算術型</b><b>、</b><b>void</b><b>、</b><b>std::nullptr_t</b><b>、</b><b>およびそれらのcv修飾を含む。</b>

##効果

`is_fundamental`は、型`T`が単純型であるならば[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生する。


##例

```cpp
#include <type_traits>static_assert(std::is_fundamental<int>::value == true, "value == true, int is fundamental");static_assert(std::is_same<std::is_fundamental<int>::value_type, bool>::value, "value_type == bool");static_assert(std::is_same<std::is_fundamental<int>::type, std::true_type>::value, "type == true_type");static_assert(std::is_fundamental<int>() == true, "is_fundamental<int>() == true");static_assert(std::is_fundamental<int*>::value == false, "value == false, int* is not fundamental");static_assert(std::is_same<std::is_fundamental<int*>::value_type, bool>::value, "value_type == bool");static_assert(std::is_same<std::is_fundamental<int*>::type, std::false_type>::value, "type == false_type");static_assert(std::is_fundamental<int*>() == false, "is_fundamental<int*>() == false");static_assert(std::is_fundamental<char>::value == true, "char is fundamental");static_assert(std::is_fundamental<unsigned>::value == true, "unsigned is fundamental");static_assert(std::is_fundamental<long long>::value == true, "long long is fundamental");static_assert(std::is_fundamental<const float>::value == true, "const float is fundamental");enum e{};static_assert(std::is_fundamental<e>::value == false, "enum is not fundamental");static_assert(std::is_fundamental<int&>::value == false, "int& is not fundamental");static_assert(std::is_fundamental<int ()>::value == false, "int () is not fundamental");static_assert(std::is_fundamental<int[1]>::value == false, "int[1] is not fundamental");static_assert(std::is_fundamental<void>::value == true, "void is fundamental");static_assert(std::is_fundamental<const volatile void>::value == true, "const volatile void is fundamental");static_assert(std::is_fundamental<std::nullptr_t>::value == true, "std::nullptr_t is fundamental");static_assert(std::is_fundamental<const volatile std::nullptr_t>::value == true, "const volatile std::nullptr_t is fundamental");int main(){}
```

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は integral_constant が operator bool を持っていないためエラーになる。


