#is_member_pointer
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_member_pointer;
}
```

##概要
型`T`がメンバポインタ型か調べる。メンバポインタ型は、データメンバへのポインタ型、メンバ関数へのポインタ型、およびそれらのcv修飾を含む。


##要件
`is_member_pointer`は、型`T`がメンバポインタ型であるならば[`true_type`](integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](integral_constant-true_type-false_type.md)から派生する。


##例
```cpp
#include <type_traits>

struct s
{
  int member_object;                     // decltype(&s::member_object) は int s::*
  void member_function(){}               // decltype(&s::member_function) は void (s::*)()
  static int static_member_object;       // decltype(&s::static_member_object) は int*
  static void static_member_function(){} // decltype(&s::static_member_function) は void (*)()
};

static_assert(std::is_member_object_pointer<int s::*>::value == true, "value == true, int s::* is member pointer");
static_assert(std::is_same<std::is_member_object_pointer<int s::*>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_member_object_pointer<int s::*>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_member_object_pointer<int s::*>() == true, "is_member_object_pointer<int s::*>() == true");

static_assert(std::is_member_object_pointer<int>::value == false, "value == false, int is not member pointer");
static_assert(std::is_same<std::is_member_object_pointer<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_member_object_pointer<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_member_object_pointer<int>() == false, "is_member_object_pointer<int>() == false");

static_assert(std::is_member_object_pointer<int s::* const>::value == true, "int s::* const is member pointer");
static_assert(std::is_member_object_pointer<const int s::*>::value == true, "const int s::* is member pointer");
static_assert(std::is_member_object_pointer<int* s::*>::value == true, "int* s::* is member pointer");

static_assert(std::is_member_function_pointer<void (s::* const)()>::value == true, "void (s::* const)() is member pointer");
static_assert(std::is_member_function_pointer<void (s::*)() const>::value == true, "void (s::*)() const is member pointer");
static_assert(std::is_member_function_pointer<const int* (s::*)()>::value == true, "const int* (s::*)() is member pointer");

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
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。

