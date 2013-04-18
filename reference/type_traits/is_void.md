#is_void
```cpp
namespace std {

  template <class T> 

  struct is_void;

}
```

##概要

<b>型Tがvoidか調べる</b>


##効果

`is_void`は、型`T`が`void`(cv修飾を許容する)であれば[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生する。


##例




```cpp
#include <type_traits>
```

`static_assert(std::is_void<void>::value == true, "value == true, void is void");`

`static_assert(std::is_same<std::is_void<void>::value_type, bool>::value, "value_type == bool");`

`static_assert(std::is_same<std::is_void<void>::type, std::true_type>::value, "type == true_type");`

`static_assert(std::is_void<void>() == true, "is_void<void>() == true");`


`static_assert(std::is_void<int>::value == false, "value == false, int is not void");`

`static_assert(std::is_same<std::is_void<int>::value_type, bool>::value, "value_type == bool");`

`static_assert(std::is_same<std::is_void<int>::type, std::false_type>::value, "type == false_type");`

`static_assert(std::is_void<int>() == false, "is_void<int>() == false");`


`static_assert(std::is_void<const void>::value == true, "const void is void");`

`static_assert(std::is_void<volatile void>::value == true, "volatile void is void");`

`static_assert(std::is_void<const volatile void>::value == true, "const volatile void is void");`


`static_assert(std::is_void<void*>::value == false, "a pointer to void is not void");`

`static_assert(std::is_void<void ()>::value == false, "a function returning void is not void");`


`int main(){}`





###出力

```cpp
<span style='line-height:21px'>
</span>
```

##バージョン

###言語

- C++11

###処理系

- GCC, C++0x mode: 4.3.4, 4.5.3, 4.6.1
- Visual C++ 10.0<h3><h4>備考</h4>
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [integral_constant](/reference/type_traits/integral_constant-true_type-false_type.md) が operator bool を持っていないためエラーになる。
</h3>

