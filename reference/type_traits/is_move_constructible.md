#is_move_constructible (C++11)
* type_traits[meta header]

```cpp
namespace std {
  template <class T>
  struct is_move_constructible;
}
```

##概要
型`T`がムーブ構築可能か調べる


##要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


##効果
`is_move_constructible`は、型`T`がムーブ構築可能であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。 
[`is_constructible`](./is_constructible.md)`<T, T&&>::value == true`の場合に、ムーブ構築可能であると判断される。


##例
```cpp
#include <type_traits>

struct s {
  s(s&&) = delete;
  // ムーブコンストラクタは = delete されている。
  // そのためムーブコンストラクトできない。
};

static_assert(std::is_move_constructible<int>::value == true, "value == true, int is move constructible");
static_assert(std::is_same<std::is_move_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_move_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_move_constructible<int>() == true, "is_move_constructible<int>() == true");

static_assert(std::is_move_constructible<s>::value == false, "value == false, s is not move constructible");
static_assert(std::is_same<std::is_move_constructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_move_constructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_move_constructible<s>() == false, "is_move_constructible<s>() == false");

static_assert(std::is_move_constructible<double>::value == true, "double is move constructible");
static_assert(std::is_move_constructible<const int>::value == true, "const int is move constructible");
static_assert(std::is_move_constructible<void*>::value == true, "void* is move constructible");
static_assert(std::is_move_constructible<int&>::value == true, "int& is move constructible");
static_assert(std::is_move_constructible<int&&>::value == true, "int&& is move constructible");

static_assert(std::is_move_constructible<int[1]>::value == false, "int[1] is not move constructible");
static_assert(std::is_move_constructible<int[]>::value == false, "int[] is not move constructible");
static_assert(std::is_move_constructible<void>::value == false, "void is not move constructible");
static_assert(std::is_move_constructible<int ()>::value == false, "int () is not move constructible");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0

