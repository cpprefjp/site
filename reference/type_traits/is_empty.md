#is_empty
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_empty;
}
```

##概要
型`T`が空のクラスか調べる。


##要件
型`T`が非共用体のクラスである場合、その型は完全型でなければならない。


##効果
`is_empty`は、型`T`が空のクラス (cv修飾を許容する) であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


##備考
空のクラスは、以下の条件を満たす型である。

- [クラス型](is_class.md)である。
- [共用型](is_union.md)でない。
- 長さ0のビットフィールド以外に、非静的データメンバを持たない。
- 仮想メンバ関数を持たない。
- 仮想基底クラスを持たない。
- 空のクラスでない基底クラスを持たない。


##例
```cpp
#include <type_traits>

class empty_class{};
struct non_empty_class {
  int m;                  // 非静的データメンバを持つ
};

static_assert(std::is_empty<empty_class>::value == true, "value == true, empty_class is empty");
static_assert(std::is_same<std::is_empty<empty_class>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_empty<empty_class>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_empty<empty_class>() == true, "is_empty<empty_class>() == true");

static_assert(std::is_empty<non_empty_class>::value == false, "value == false, non_empty_class is not empty");
static_assert(std::is_same<std::is_empty<non_empty_class>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_empty<non_empty_class>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_empty<non_empty_class>() == false, "is_empty<non_empty_class>() == false");

static_assert(std::is_empty<const volatile empty_class>::value == true, "value == true, const volatile empty_class is empty");
static_assert(std::is_empty<empty_class&>::value == false, "value == true, empty_class& is not empty");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


##参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型`T`が非共用体のクラスである場合、その型は完全型でなければならない。」に変更された。

