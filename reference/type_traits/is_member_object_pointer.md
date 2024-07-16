# is_member_object_pointer
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_member_object_pointer;

  template <class T>
  inline constexpr bool is_member_object_pointer_v
    = is_member_object_pointer<T>::value;          // C++17
}
```

## 概要
型`T`がメンバ変数へのポインタ型かを調べる


## 効果
`is_member_object_pointer`は、型`T`がメンバ変数へのポインタであるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
メンバ関数へのポインタはメンバ変数へのポインタではない。`static`なメンバ変数へのポインタはメンバ変数へのポインタではない。


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

static_assert(std::is_member_object_pointer<int s::*>::value == true, "value == true, int s::* is member object pointer");
static_assert(std::is_same<std::is_member_object_pointer<int s::*>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_member_object_pointer<int s::*>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_member_object_pointer<int s::*>() == true, "is_member_object_pointer<int s::*>() == true");

static_assert(std::is_member_object_pointer<int>::value == false, "value == false, int is not member object pointer");
static_assert(std::is_same<std::is_member_object_pointer<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_member_object_pointer<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_member_object_pointer<int>() == false, "is_member_object_pointer<int>() == false");

static_assert(std::is_member_object_pointer<int s::* const>::value == true, "int s::* const is member object pointer");
static_assert(std::is_member_object_pointer<const int s::*>::value == true, "const int s::* is member object pointer");
static_assert(std::is_member_object_pointer<int* s::*>::value == true, "int* s::* is member object pointer");

static_assert(std::is_member_object_pointer<void (s::*)()>::value == false, "void (s::*)() is not member object pointer");
static_assert(std::is_member_object_pointer<int*>::value == false, "int* is not member object pointer");
static_assert(std::is_member_object_pointer<void (*)()>::value == false, "void (*)() is not member object pointer");

int main(){}
```
* std::is_member_object_pointer[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.4 [mark verified], 4.5.3 [mark verified], 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 2010 は [`integral_constant`](integral_constant.md) が `operator bool()` を持っていないためエラーになる。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
