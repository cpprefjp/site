# is_class
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_class;

  template <class T>
  constexpr bool is_class_v = is_class<T>::value; // C++17
}
```

## 概要
型`T`がクラス型かを調べる。

ここでのクラス型とは、`struct`キーワードもしくは`class`キーワードによって定義された型である。


## 効果
`is_class`は、型`T`がクラスであるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
型`T`が`union`、`enum`、`enum class`の場合、`is_class`は[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>

class c{};
struct s{};
enum e{};
enum class ec{};
union u{};

static_assert(std::is_class<c>::value == true, "value == true, c is class");
static_assert(std::is_same<std::is_class<c>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_class<c>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_class<c>() == true, "is_class<c>() == true");

static_assert(std::is_class<int>::value == false, "value == false, int is not class");
static_assert(std::is_same<std::is_class<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_class<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_class<int>() == false, "is_class<int>() == false");

static_assert(std::is_class<const c>::value == true, "const c is class");
static_assert(std::is_class<volatile c>::value == true, "volatile c is class");
static_assert(std::is_class<const volatile c>::value == true, "const volatile c is class");
static_assert(std::is_class<s>::value == true, "s is class");

static_assert(std::is_class<u*>::value == false, "u* is not class");
static_assert(std::is_class<e>::value == false, "e is not class");
static_assert(std::is_class<ec>::value == false, "ec is not class");
static_assert(std::is_class<u>::value == false, "u is not class");

int main(){}
```
* std::is_class[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.1, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 2010 は [`integral_constant`](integral_constant.md) が `operator bool()` を持っていないためエラーになる。また、GCC 4.3.4, Visual C++ 2010 は `enum class` に対応していたいためにエラーになる。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
