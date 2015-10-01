#is_move_assignable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_move_assignable;
}
```

##概要
型`T`がムーブ代入可能か調べる


##要件
`T` は完全型であるか、`const`/`volatile` 修飾された(あるいはされていない)`void` か、要素数不明の配列型でなければならない。


##効果
`is_move_assignable` は `T` がムーブ代入可能であるならば [`true_type`](./integral_constant-true_type-false_type.md) から派生し、そうでなければ [`false_type`](./integral_constant-true_type-false_type.md) から派生する。

以下の条件が`true`である場合に、ムーブ代入可能であると見なされる：

- C++11 : [`is_assignable`](./is_assignable.md)`<T&, T&&>::value == true`
- C++14 : 参照可能な型`T`に対しては、[`is_assignable`](./is_assignable.md)`<T&, T&&>::value == true`と同じ結果となり、それ以外は`false`と見なされる。
    - 参照可能な型とは、以下のいずれかの条件に合致する型である：
        - [オブジェクト型](./is_object.md)
        - CV修飾されていない、もしくは参照修飾されていない関数型
        - 参照修飾されている型

##例
```cpp
#include <type_traits>
#include <memory>

struct s
{
  s& operator=(s&&) = delete;
  // ムーブ代入は = delete されている。
  // そのためムーブ代入はできない。
};

static_assert(std::is_move_assignable<int>::value == true, "value == true, int is move assignable");
static_assert(std::is_same<std::is_move_assignable<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_move_assignable<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_move_assignable<int>() == true, "is_move_assignable<int>() == true");

static_assert(std::is_move_assignable<s>::value == false, "value == false, s is not move assignable");
static_assert(std::is_same<std::is_move_assignable<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_move_assignable<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_move_assignable<s>() == false, "is_move_assignable<int>() == false");

static_assert(std::is_move_assignable<int&>::value == true, "int& is move assignable");
static_assert(std::is_move_assignable<int&&>::value == true, "int&& is move assignable");
static_assert(std::is_move_assignable<volatile int>::value == true, "volatile int is move assignable");
static_assert(std::is_move_assignable<unsigned>::value == true, "unsigned is move assignable");
static_assert(std::is_move_assignable<std::unique_ptr<int>>::value == true, "std::unique_ptr<int> is move assignable");

static_assert(std::is_move_assignable<s&>::value == false, "s& is not move assignable");
static_assert(std::is_move_assignable<s&&>::value == false, "s&& is not move assignable");
static_assert(std::is_move_assignable<const int>::value == false, "const int is not move assignable");
static_assert(std::is_move_assignable<int[1]>::value == false, "int[1] is not move assignable");
static_assert(std::is_move_assignable<int[]>::value == false, "int[] is not move assignable");
static_assert(std::is_move_assignable<void>::value == false, "void is not move assignable");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.8.0


##参照
- [LWG Issue 2196. Specification of `is_*[copy/move]_[constructible/assignable]` unclear for non-referencable types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2196)
    - C++11では、この型特性が参照型に対してどのような振る舞いになるのか不明確であったため、C++14で明確化された。

