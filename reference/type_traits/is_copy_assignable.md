#is_copy_assignable
```cpp
namespace std {
  template <class T>
  struct is_copy_assignable;
}
```

##概要
型`T`がコピー代入可能かを調べる。


##要件
`T` は完全型であるか、`const`/`volatile` 修飾された(あるいはされていない)`void` か、要素数不明の配列型でなければならない。


##効果
`is_copy_assignable` は `T` がコピー代入可能であるならば [`true_type`](./integral_constant-true_type-false_type.md) から派生し、そうでなければ [`false_type`](./integral_constant-true_type-false_type.md) から派生する。
[`is_assignable`](./is_assignable.md)`<T&, const T&>::value == true` の時に、コピー代入可能であると判断される。


##例
```cpp
#include <type_traits>

struct s
{
  s& operator=(const s&) = delete;
  // コピー代入は = delete されている。
  // そのためコピー代入はできない。
};

static_assert(std::is_copy_assignable<int>::value == true, "value == true, int is copy assignable");
static_assert(std::is_same<std::is_copy_assignable<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_copy_assignable<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_copy_assignable<int>() == true, "is_copy_assignable<int>() == true");

static_assert(std::is_copy_assignable<s>::value == false, "value == false, s is not copy assignable");
static_assert(std::is_same<std::is_copy_assignable<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_copy_assignable<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_copy_assignable<s>() == false, "is_copy_assignable<int>() == false");

static_assert(std::is_copy_assignable<int&>::value == true, "int& is copy assignable");
static_assert(std::is_copy_assignable<int&&>::value == true, "int&& is copy assignable");
static_assert(std::is_copy_assignable<volatile int>::value == true, "volatile int is copy assignable");
static_assert(std::is_copy_assignable<unsigned>::value == true, "unsigned is copy assignable");
static_assert(std::is_copy_assignable<void*>::value == true, "void* is copy assignable");

static_assert(std::is_copy_assignable<s&>::value == false, "s& is not copy assignable");
static_assert(std::is_copy_assignable<s&&>::value == false, "s&& is not copy assignable");
static_assert(std::is_copy_assignable<const int>::value == false, "const int is not copy assignable");
static_assert(std::is_copy_assignable<int[1]>::value == false, "int[1] is not copy assignable");
static_assert(std::is_copy_assignable<int[]>::value == false, "int[] is not copy assignable");
static_assert(std::is_copy_assignable<void>::value == false, "void is not copy assignable");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0

