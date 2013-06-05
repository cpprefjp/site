#is_polymorphic
```cpp
namespace std {
  template <class T>
  struct is_polymorphic;
}
```

##概要
型`T`が多相的なクラスか調べる


##要件
型`T`は完全型でなければならない。


##効果
`is_polymorphic`は、型`T`が多相的クラス (cv修飾を許容する) であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
多相的クラスは、少なくとも一つの仮想関数を持つクラスである。


##例
```cpp
#include <type_traits>

struct polymorphic_class {
  virtual ~polymorphic_class() {}   // 仮想関数を持つ
};
class non_polymorphic_class{};

static_assert(std::is_polymorphic<polymorphic_class>::value == true, "value == true, polymorphic_class is polymorphic");
static_assert(std::is_same<std::is_polymorphic<polymorphic_class>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_polymorphic<polymorphic_class>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_polymorphic<polymorphic_class>() == true, "is_polymorphic<polymorphic_class>() == true");

static_assert(std::is_polymorphic<non_polymorphic_class>::value == false, "value == false, non_polymorphic_class is not polymorphic");
static_assert(std::is_same<std::is_polymorphic<non_polymorphic_class>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_polymorphic<non_polymorphic_class>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_polymorphic<non_polymorphic_class>() == false, "is_polymorphic<non_polymorphic_class>() == false");

static_assert(std::is_polymorphic<const volatile polymorphic_class>::value == true, "value == true, const volatile polymorphic_class is polymorphic");
static_assert(std::is_polymorphic<polymorphic_class&>::value == false, "value == true, polymorphic_class& is not polymorphic");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation#visual_cpp.md) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


