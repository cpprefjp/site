#is_destructible(C++11)
```cpp
namespace std {
  template <class T>
  struct is_destructible;
}
```

##概要
型`T`が破棄可能か調べる


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果

`is_destructible`型Tが破棄可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。 
型Tが完全型で `template <class U> struct test { U u; };` があるときに `test<T>::~test()` が`delete`宣言されていなければ、型`T`は破棄可能であると判断される。


##例
```cpp
#include <type_traits>
#include <locale>

struct s
{
  ~s() = delete;

  // デストラクタは = delete されている。
  // そのためデストラクトできない。
};

static_assert(std::is_destructible<int>::value == true, "value == true, int is destructible");
static_assert(std::is_same<std::is_destructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_destructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_destructible<int>() == true, "is_destructible<int>() == true");

static_assert(std::is_destructible<s>::value == false, "value == false, s is not destructible");
static_assert(std::is_same<std::is_destructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_destructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_destructible<s>() == false, "is_destructible<int>() == false");

static_assert(std::is_destructible<s&>::value == true, "s& is destructible");
static_assert(std::is_destructible<s&&>::value == true, "s&& is destructible");
static_assert(std::is_destructible<const int>::value == true, "const int is destructible");
static_assert(std::is_destructible<int[1]>::value == true, "int[1] is destructible");

static_assert(std::is_destructible<int[]>::value == false, "int[] is not destructible");
static_assert(std::is_destructible<void>::value == false, "void is not destructible");
static_assert(std::is_destructible<std::locale::facet>::value == false, "std::locale::facet is not destructible");
static_assert(std::is_destructible<std::ctype<char>>::value == false, "std::ctype<char> is not destructible");

int main(){}
```

###出力

```cpp
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.8.0

