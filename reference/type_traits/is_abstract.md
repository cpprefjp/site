#is_abstract (C++11)
* type_traits[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  struct is_abstract;
}
```

##概要
型`T`が抽象クラスか調べる。


##要件
型`T`は完全型でなければならない。


##効果
`is_abstract`は、型`T`が抽象クラス (cv修飾を許容する) であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##備考
抽象クラスとは、少なくとも一つの純粋仮想関数を持つクラスである。

抽象クラスそれ自体はインスタンス化できず、そのクラス派生して純粋仮想関数をオーバーライドし、その派生したクラスをインスタンス化しなければならない。


##例
```cpp
#include <type_traits>

struct abstract_class {
  virtual void member() = 0; // 純粋仮想関数を持つ
};
class non_abstract_class{};

static_assert(std::is_abstract<abstract_class>::value == true, "value == true, abstract_class is abstract");
static_assert(std::is_same<std::is_abstract<abstract_class>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_abstract<abstract_class>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_abstract<abstract_class>() == true, "is_abstract<abstract_class>() == true");

static_assert(std::is_abstract<non_abstract_class>::value == false, "value == false, non_abstract_class is not abstract");
static_assert(std::is_same<std::is_abstract<non_abstract_class>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_abstract<non_abstract_class>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_abstract<non_abstract_class>() == false, "is_abstract<non_abstract_class>() == false");

static_assert(std::is_abstract<const volatile abstract_class>::value == true, "value == true, const volatile abstract_class is abstract");
static_assert(std::is_abstract<abstract_class&>::value == false, "value == true, abstract_class& is not abstract");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


