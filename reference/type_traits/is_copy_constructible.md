#is_copy_constructible
```cpp
namespace std {
  template <class T>
  struct is_copy_constructible;
}
```

##概要

<b>型Tがコピー構築可能か調べる</b>


##要件

型`T`は完全型であるか、`const/volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。



##効果

`is_copy_constructible`は、型Tがコピー構築可能であるならば[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生する。
`[is_constructible](/reference/type_traits/is_constructible.md)<T, const T&>::value == true`の時に、コピー構築可能であると判断される。



##例

```cpp
#include <type_traits>

struct s {
  s(const s&) = delete;
  // コピーコンストラクタは = delete されている。
  // そのためコピーコンストラクトできない。
};

static_assert(std::is_copy_constructible<int>::value == true, "value == true, int is copy constructible");
static_assert(std::is_same<std::is_copy_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_copy_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_copy_constructible<int>() == true, "is_copy_constructible<int>() == true");

static_assert(std::is_copy_constructible<s>::value == false, "value == false, s is not copy constructible");
static_assert(std::is_same<std::is_copy_constructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_copy_constructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_copy_constructible<s>() == false, "is_copy_constructible<s>() == false");

static_assert(std::is_copy_constructible<double>::value == true, "double is copy constructible");
static_assert(std::is_copy_constructible<const int>::value == true, "const int is copy constructible");
static_assert(std::is_copy_constructible<void*>::value == true, "void* is copy constructible");
static_assert(std::is_copy_constructible<int&>::value == true, "int& is copy constructible");

static_assert(std::is_copy_constructible<int[1]>::value == false, "int[1] is not copy constructible");
static_assert(std::is_copy_constructible<int[]>::value == false, "int[] is not copy constructible");
static_assert(std::is_copy_constructible<void>::value == false, "void is not copy constructible");
static_assert(std::is_copy_constructible<int&&>::value == false, "int&& is not copy constructible");
static_assert(std::is_copy_constructible<int ()>::value == false, "int () is not copy constructible");

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

- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0

