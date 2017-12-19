# is_object
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_object;

  template <class T>
  constexpr bool is_object_v = is_object<T>::value; // C++17
}
```

## 概要
型`T`がオブジェクト型か調べる。オブジェクト型は、スカラ型、配列型、共用型、クラス型、およびそれらのcv修飾を含む。


## 効果
`is_object`は、型`T`がオブジェクト型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](true_type.md)から派生する。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_object<int>::value == true, "value == true, int is object");
static_assert(std::is_same<std::is_object<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_object<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_object<int>() == true, "is_object<int>() == true");

static_assert(std::is_object<void>::value == false, "value == false, void is not object");
static_assert(std::is_same<std::is_object<void>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_object<void>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_object<void>() == false, "is_object<void>() == false");

enum e{};
class c{};
union u{};
static_assert(std::is_object<e>::value == true, "enum is object");
static_assert(std::is_object<c>::value == true, "class is object");
static_assert(std::is_object<u>::value == true, "union is object");
static_assert(std::is_object<const volatile int>::value == true, "const volatile int is object");
static_assert(std::is_object<int*>::value == true, "int* is object");
static_assert(std::is_object<int[1]>::value == true, "int[1] is object");
static_assert(std::is_object<int&>::value == false, "int& is not object");
static_assert(std::is_object<int ()>::value == false, "int () is not object");
static_assert(std::is_object<std::nullptr_t>::value == true, "std::nullptr_t is object");

int main(){}
```
* std::is_object[color ff0000]
* std::nullptr_t[link /reference/cstddef/nullptr_t.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 2010 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
