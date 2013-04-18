#is_default_constructible
```cpp
namespace std {
  template <class T>
  struct is_default_constructible;
}
```

##概要

<b>型Tがデフォルト構築可能か調べる</b>


##要件
型`T`は完全型であるか、`const/volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。

##効果

`is_default_constructible`は、型`T`がデフォルトコンストラクト可能であるならば[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生する。
`[is_constructible](/reference/type_traits/is_constructible.md)<T>::value == true`の時に、デフォルトコンストラクト可能であると判断される。


##例

```cpp
#include <type_traits>

struct s {
  s(int){}
  // デフォルトコンストラクタは暗黙に = delete されている。
  // そのためデフォルトコンストラクトできない。
};

static_assert(std::is_default_constructible<int>::value == true, "value == true, int is default constructible");
static_assert(std::is_same<std::is_default_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_default_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_default_constructible<int>() == true, "is_default_constructible<int>() == true");

static_assert(std::is_default_constructible<s>::value == false, "value == false, s is not default constructible");
static_assert(std::is_same<std::is_default_constructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_default_constructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_default_constructible<s>() == false, "is_default_constructible<s>() == false");

static_assert(std::is_default_constructible<double>::value == true, "double is default constructible");
static_assert(std::is_default_constructible<const int>::value == true, "const int is default constructible");
static_assert(std::is_default_constructible<int[1]>::value == true, "int[1] is default constructible");
static_assert(std::is_default_constructible<void*>::value == true, "void* is default constructible");

static_assert(std::is_default_constructible<int[]>::value == false, "int[] is not default constructible");
static_assert(std::is_default_constructible<void>::value == false, "void is not default constructible");
static_assert(std::is_default_constructible<int&>::value == false, "int& is not default constructible");
static_assert(std::is_default_constructible<int&&>::value == false, "int&& is not default constructible");
static_assert(std::is_default_constructible<int ()>::value == false, "int () is not default constructible");

int main(){}
```

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0<h4>備考</h4>

上の例でコンパイラによってはエラーになる。Clang 3.0 は constexpr に対応していないためにエラーになる。operator bool は持っているので、実行時に用いることはできる。
