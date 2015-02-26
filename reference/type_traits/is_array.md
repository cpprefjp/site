#is_array (C++11)
* type_traits[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  struct is_array;
}
```

##概要
型`T`が配列型かを調べる


##効果
`is_array`は、`T`が配列型であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
要素数が未知(`T[]`)だとしても判断することができる。クラステンプレート[`array`](/reference/array.md)は、配列型とは見なされない。


##例
```cpp
#include <type_traits>
#include <array>

static_assert(std::is_array<int[1]>::value == true, "value == true, int[1] is array");
static_assert(std::is_same<std::is_array<int[1]>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_array<int[1]>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_array<int[1]>() == true, "is_array<int[1]>() == true");

static_assert(std::is_array<int>::value == false, "value == false, int is not array");
static_assert(std::is_same<std::is_array<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_array<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_array<int>() == false, "is_array<int>() == false");

static_assert(std::is_array<int[]>::value == true, "int[] double is array");
static_assert(std::is_array<int*[2]>::value == true, "int*[2] is array");
static_assert(std::is_array<const unsigned[3][4]>::value == true, "const unsigned[3][4] is array");
static_assert(std::is_array<volatile long[][5]>::value == true, "volatile long[][5] is array");

static_assert(std::is_array<std::array<int, 6> >::value == false, "std::array<int, 6> is not array");
static_assert(std::is_array<int (*)[7]>::value == false, "int (*)[7]* is not array");
static_assert(std::is_array<long (&)[8]>::value == false, "long (&)[8] is not array");
static_assert(std::is_array<void (int (&)[9])>::value == false, "void (int (&)[9]) is not array");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- GCC, C++0x mode: 4.3.4, 4.5.3, 4.6.1, 4.7.2
- Visual C++ 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](./integral_constant-true_type-false_type.md) が `operator bool()` を持っていないためエラーになる。

