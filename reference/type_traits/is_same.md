#is_same (C++11)
* type_traits[meta header]

```cpp
namespace std {
  template <class T, class U>
  struct is_same;
}
```

##概要
2つの型`T`と`U`が同じ型か調べる


##効果
`is_same`は、CV修飾子が同じであることを含め型`T`と型`U`が同じ型であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##例
```cpp
#include <type_traits>

typedef std::is_same<int, int> same;

static_assert(same::value == true, "int == int");
static_assert(std::is_same<same::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<same::type, std::true_type>::value, "type == true_type");
static_assert(same() == true, "same() == true");

struct my_type{};
typedef std::is_same<int, my_type> not_same;

static_assert(not_same::value == false, "int != my_type");
static_assert(std::is_same<not_same::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<not_same::type, std::false_type>::value, "type == false_type");
static_assert(not_same() == false, "not_same() == false");

typedef int my_int;

static_assert(std::is_same<int, my_int>::value == true, "int == my_int");
static_assert(std::is_same<my_type, my_type>::value == true, "my_type == my_type");

static_assert(std::is_same<int, const int>::value == false, "int != const int");
static_assert(std::is_same<int, int*>::value == false, "int != int*");
static_assert(std::is_same<int, my_type>::value == false, "int != my_type");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- GCC, C++0x mode: 4.3.4, 4.6.1
- Visual C++ 10.0


