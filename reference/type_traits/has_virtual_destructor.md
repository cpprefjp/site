#has_virtual_destructor (C++11)
* type_traits[meta header]

```cpp
namespace std {
  template <class T>
  struct has_virtual_destructor;
}
```

##概要
型`T`が仮想デストラクタを持っているか調べる


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`has_virtual_destructor`は、型`T`が仮想デストラクタを持っていれば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。 

##例
```cpp
#include <type_traits>

struct A {
  ~A() = default;
};

struct B {
  virtual ~B() = default;
};

static_assert(std::has_virtual_destructor<A>::value == false, "A hasn't virtual destructor");
static_assert(std::has_virtual_destructor<B>::value == true,  "B has virtual destructor");

static_assert(std::is_same<std::has_virtual_destructor<A>::type, std::false_type>::value, "B hasn't virtual destructor");
static_assert(std::is_same<std::has_virtual_destructor<B>::type, std::true_type>::value, "B has virtual destructor");

static_assert(std::has_virtual_destructor<int>::value == false, "int hasn't virtual destructor");
static_assert(std::has_virtual_destructor<int[]>::value == false, "array hasn't virtual destructor");
static_assert(std::has_virtual_destructor<void>::value == false, "void hasn't virtual destructor");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.1
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.3

####備考

