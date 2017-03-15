# is_lvalue_reference
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_lvalue_reference;
}
```

## 概要
型`T`が左辺値参照型かを調べる


## 効果
`is_lvalue_reference`は、型`T`が左辺値参照型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
右辺値参照型は左辺値参照型ではない。


## 例
```cpp
#include <type_traits>

static_assert(std::is_lvalue_reference<int&>::value == true, "value == true, int& is lvalue reference");
static_assert(std::is_same<std::is_lvalue_reference<int&>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_lvalue_reference<int&>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_lvalue_reference<int&>() == true, "is_lvalue_reference<int&>() == true");

static_assert(std::is_lvalue_reference<int>::value == false, "value == false, int is not lvalue reference");
static_assert(std::is_same<std::is_lvalue_reference<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_lvalue_reference<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_lvalue_reference<int>() == false, "is_lvalue_reference<int>() == false");

static_assert(std::is_lvalue_reference<unsigned&>::value == true, "unsigned& is lvalue reference");
static_assert(std::is_lvalue_reference<const long&>::value == true, "const long& is lvalue reference");
static_assert(std::is_lvalue_reference<const double*&>::value == true, "const double*& is lvalue reference");
static_assert(std::is_lvalue_reference<void (&)()>::value == true, "void (&)() is lvalue reference");

static_assert(std::is_lvalue_reference<int*>::value == false, "int* is not lvalue reference");
static_assert(std::is_lvalue_reference<int&&>::value == false, "int&& is not lvalue reference");
static_assert(std::is_lvalue_reference<void ()>::value == false, "void () is not lvalue reference");
static_assert(std::is_lvalue_reference<void (int&)>::value == false, "void (int&) is not lvalue reference");

int main(){}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- GCC, C++11 mode: 4.3.4, 4.5.3, 4.6.1, 4.7.2
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](integral_constant.md) が `operator bool()` を持っていないためエラーになる。

