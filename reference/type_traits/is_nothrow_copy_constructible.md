#is_nothrow_copy_constructible(C++11)
```cpp
namespace std {
  template <class T>
  struct is_nothrow_copy_constructible;
}
```

##概要
型`T`がコピー構築でき、かつそのコピーコンストラクタが例外を投げないか調べる


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_nothrow_copy_constructible`は、型`T`が例外を投げない保証のもとにコピー構築可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。 
[`is_nothrow_constructible`](./is_nothrow_constructible.md)`<T, const T&>::value == true`の時に、コピー構築可能かつ例外を投げないと判断される。[`is_nothrow_constructible`](./is_nothrow_constructible.md)`<T, T&>::value`では判断できないので注意。


##例
```cpp
#include <type_traits>

struct s {
  s(const s&) {
    throw 0;
  }
};

struct t {
  t(const t&) = delete;
  t(t&&) = default;
};

struct u {
  u(const u&) = default;
  u(u&&) = delete;
};

static_assert(std::is_nothrow_copy_constructible<int>::value == true, "value == true, int is nothrow copy constructible");
static_assert(std::is_same<std::is_nothrow_copy_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_nothrow_copy_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_nothrow_copy_constructible<int>() == true, "is_nothrow_copy_constructible<int>() == true");

static_assert(std::is_nothrow_copy_constructible<s>::value == false, "value == false, s is not nothrow copy constructible");
static_assert(std::is_same<std::is_nothrow_copy_constructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_nothrow_copy_constructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_nothrow_copy_constructible<s>() == false, "is_nothrow_copy_constructible<s>() == false");

static_assert(std::is_nothrow_copy_constructible<unsigned>::value == true, "unsigned is nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<const int>::value == true, "const int is nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<int&>::value == true, "int& is nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<void*>::value == true, "void* is nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<u>::value == true, "u is nothrow copy constructible");

static_assert(std::is_nothrow_copy_constructible<t>::value == false, "t is not nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<int[]>::value == false, "int[] is not nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<int[1]>::value == false, "int[1] is not nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<void>::value == false, "void is not nothrow copy constructible");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0, 4.8.0

