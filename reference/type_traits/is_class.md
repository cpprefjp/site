#is_class (C++11)
```cpp
namespace std {
  template <class T>
  struct is_class;
}
```

##概要
型`T`がクラス型かを調べる


##効果
`is_class`は、型`T`がクラスであるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
型`T`が`union`、`enum`、`enum class`の場合、`is_class`は[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##例
```cpp
#include <type_traits>

class c{};
struct s{};
enum e{};
enum class ec{};
union u{};

static_assert(std::is_class<c>::value == true, "value == true, c is class");
static_assert(std::is_same<std::is_class<c>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_class<c>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_class<c>() == true, "is_class<c>() == true");

static_assert(std::is_class<int>::value == false, "value == false, int is not class");
static_assert(std::is_same<std::is_class<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_class<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_class<int>() == false, "is_class<int>() == false");

static_assert(std::is_class<const c>::value == true, "const c is class");
static_assert(std::is_class<volatile c>::value == true, "volatile c is class");
static_assert(std::is_class<const volatile c>::value == true, "const volatile c is class");
static_assert(std::is_class<s>::value == true, "s is class");

static_assert(std::is_class<u*>::value == false, "u* is not class");
static_assert(std::is_class<e>::value == false, "e is not class");
static_assert(std::is_class<ec>::value == false, "ec is not class");
static_assert(std::is_class<u>::value == false, "u is not class");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.5.3, 4.6.1, 4.7.0
- [Visual C++](/implementation#visual_cpp.md) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](./integral_constant-true_type-false_type.md) が `operator bool(){ を持っていないためエラーになる。また、GCC 4.3.4, Visual C++ 10.0 は `enum class` に対応していたいためにエラーになる。

