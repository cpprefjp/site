# is_same
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct is_same;

  template <class T, class U>
  inline constexpr bool is_same_v = is_same<T, U>::value; // C++17
}
```

## 概要
2つの型`T`と`U`が同じ型か調べる


## 効果
`is_same`は、CV修飾�が同じであることを含め型`T`と型`U`が同じ型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>

using same = std::is_same<int, int>;

static_assert(same::value == true, "int == int");
static_assert(std::is_same<same::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<same::type, std::true_type>::value, "type == true_type");
static_assert(same() == true, "same() == true");

struct my_type{};
using not_same = std::is_same<int, my_type>;

static_assert(not_same::value == false, "int != my_type");
static_assert(std::is_same<not_same::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<not_same::type, std::false_type>::value, "type == false_type");
static_assert(not_same() == false, "not_same() == false");

using my_int = int;

static_assert(std::is_same<int, my_int>::value == true, "int == my_int");
static_assert(std::is_same<my_type, my_type>::value == true, "my_type == my_type");

static_assert(std::is_same<int, const int>::value == false, "int != const int");
static_assert(std::is_same<int, int*>::value == false, "int != int*");
static_assert(std::is_same<int, my_type>::value == false, "int != my_type");

int main(){}
```
* std::is_same[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.4, 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
