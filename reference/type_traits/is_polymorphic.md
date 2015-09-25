#is_polymorphic
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_polymorphic;
}
```

##概要
型`T`が多相的なクラスか調べる


##要件
型`T`が非共用体のクラスである場合、その型は完全型でなければならない。


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
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


##参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型`T`が非共用体のクラスである場合、その型は完全型でなければならない。」に変更された。

