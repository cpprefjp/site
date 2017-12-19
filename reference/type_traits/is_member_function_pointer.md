# is_member_function_pointer
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_member_function_pointer;

  template <class T>
  constexpr bool is_member_function_pointer_v
    = is_member_function_pointer<T>::value;   // C++17
}
```

## 概要
型`T`がメンバ関数へのポインタかを調べる


## 効果
`is_member_function_pointer`は、型`T`がメンバ関数へのポインタであるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
データメンバへのポインタはメンバ関数へのポインタではない。`static`なメンバ関数へのポインタはメンバ関数へのポインタではない。


## 例

```cpp example
#include <type_traits>

struct s
{
  int member_object;                     // decltype(&s::member_object) は int s::*
  void member_function(){}               // decltype(&s::member_function) は void (s::*)()
  static int static_member_object;       // decltype(&s::static_member_object) は int*
  static void static_member_function(){} // decltype(&s::static_member_function) は void (*)()
};

static_assert(std::is_member_function_pointer<void (s::*)()>::value == true, "value == true, void (s::*)() is member function pointer");
static_assert(std::is_same<std::is_member_function_pointer<void (s::*)()>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_member_function_pointer<void (s::*)()>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_member_function_pointer<void (s::*)()>() == true, "is_member_function_pointer<void (s::*)()>() == true");

static_assert(std::is_member_function_pointer<int>::value == false, "value == false, int is not member function pointer");
static_assert(std::is_same<std::is_member_function_pointer<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_member_function_pointer<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_member_function_pointer<int>() == false, "is_member_function_pointer<int>() == false");

static_assert(std::is_member_function_pointer<void (s::* const)()>::value == true, "void (s::* const)() is member function pointer");
static_assert(std::is_member_function_pointer<void (s::*)() const>::value == true, "void (s::*)() const is member function pointer");
static_assert(std::is_member_function_pointer<const int* (s::*)()>::value == true, "const int* (s::*)() is member function pointer");

static_assert(std::is_member_function_pointer<int s::*>::value == false, "int s::* is not member function pointer");
static_assert(std::is_member_function_pointer<int*>::value == false, "int* is not member function pointer");
static_assert(std::is_member_function_pointer<void (*)()>::value == false, "void (*)() is not member function pointer");

int main(){}
```
* std::is_member_function_pointer[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.6.1, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 2010 は [`integral_constant`](integral_constant.md) が `operator bool()` を持っていないためエラーになる。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
