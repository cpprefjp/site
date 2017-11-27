# is_floating_point
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_floating_point;

  template <class T>
  constexpr bool is_floating_point_v = is_floating_point<T>::value; // C++17
}
```

## 概要
型Tが浮動小数点型かを調べる

## 効果
`is_floating_point`は、型`T`が浮動小数点型(cv修飾を許容する)であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_floating_point<float>::value == true, "value == true, float is floating point");
static_assert(std::is_same<std::is_floating_point<float>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_floating_point<float>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_floating_point<float>() == true, "is_floating_point<float>() == true");

static_assert(std::is_floating_point<int>::value == false, "value == false, int is not floating point");
static_assert(std::is_same<std::is_floating_point<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_floating_point<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_floating_point<int>() == false, "is_floating_point<int>() == false");

static_assert(std::is_floating_point<double>::value == true, "double is floating point");
static_assert(std::is_floating_point<long double>::value == true, "long double is floating point");
static_assert(std::is_floating_point<const float>::value == true, "const float is floating point");
static_assert(std::is_floating_point<volatile double>::value == true, "volatile double is floating point");

static_assert(std::is_floating_point<unsigned>::value == false, "unsigned is not floating point");
static_assert(std::is_floating_point<float*>::value == false, "float* is not floating point");
static_assert(std::is_floating_point<double&>::value == false, "double& is not floating point");
static_assert(std::is_floating_point<long double[1]>::value == false, "long double[1] is not floating point");

int main(){}
```
* std::is_floating_point[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- GCC, C++11 mode: 4.3.4, 4.5.3, 4.6.1, 4.7.2
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](integral_constant.md) が `operator bool()` を持っていないためエラーになる。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
