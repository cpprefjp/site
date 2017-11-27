# is_abstract
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_abstract;

  template <class T>
  constexpr bool is_abstract_v = is_abstract<T>::value; // C++17
}
```

## 概要
型`T`が抽象クラスか調べる。


## 要件
型`T`が非共用体のクラスである場合、その型は完全型でなければならない。


## 効果
`is_abstract`は、型`T`が抽象クラス (cv修飾を許容する) であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
抽象クラスとは、少なくとも一つの純粋仮想関数を持つクラスである。

抽象クラスそれ自体はインスタンス化できず、そのクラスから派生して純粋仮想関数をオーバーライドし、その派生したクラスをインスタンス化しなければならない。


## 例
```cpp example
#include <type_traits>

struct abstract_class {
  virtual void member() = 0; // 純粋仮想関数を持つ
};
class non_abstract_class{};

static_assert(std::is_abstract<abstract_class>::value == true, "value == true, abstract_class is abstract");
static_assert(std::is_same<std::is_abstract<abstract_class>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_abstract<abstract_class>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_abstract<abstract_class>() == true, "is_abstract<abstract_class>() == true");

static_assert(std::is_abstract<non_abstract_class>::value == false, "value == false, non_abstract_class is not abstract");
static_assert(std::is_same<std::is_abstract<non_abstract_class>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_abstract<non_abstract_class>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_abstract<non_abstract_class>() == false, "is_abstract<non_abstract_class>() == false");

static_assert(std::is_abstract<const volatile abstract_class>::value == true, "value == true, const volatile abstract_class is abstract");
static_assert(std::is_abstract<abstract_class&>::value == false, "value == true, abstract_class& is not abstract");

int main(){}
```
* std::is_abstract[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


## 参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型`T`が非共用体のクラスである場合、その型は完全型でなければならない。」に変更された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
