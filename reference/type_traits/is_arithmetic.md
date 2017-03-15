# is_arithmetic
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_arithmetic;
}
```

## 概要
型が算術型か調べる。算術型は、整数型、浮動小数点型、およびそれらのcv修飾を含む。


## 効果
`is_arithmetic`は、型`T`が算術型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](true_type.md)から派生する。


## 例
```cpp
#include <type_traits>

static_assert(std::is_arithmetic<int>::value == true, "value == true, int is arithmetic");
static_assert(std::is_same<std::is_arithmetic<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_arithmetic<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_arithmetic<int>() == true, "is_arithmetic<int>() == true");

static_assert(std::is_arithmetic<int*>::value == false, "value == false, int* is not arithmetic");
static_assert(std::is_same<std::is_arithmetic<int*>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_arithmetic<int*>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_arithmetic<int*>() == false, "is_arithmetic<int*>() == false");

static_assert(std::is_arithmetic<char>::value == true, "char is arithmetic");
static_assert(std::is_arithmetic<unsigned>::value == true, "unsigned is arithmetic");
static_assert(std::is_arithmetic<long long>::value == true, "long long is arithmetic");
static_assert(std::is_arithmetic<const float>::value == true, "const float is arithmetic");

enum e{};
static_assert(std::is_arithmetic<e>::value == false, "e is not arithmetic");
static_assert(std::is_arithmetic<int&>::value == false, "int& is not arithmetic");
static_assert(std::is_arithmetic<int ()>::value == false, "int () is not arithmetic");
static_assert(std::is_arithmetic<int[1]>::value == false, "int[1] is not arithmetic");

int main(){}
```


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
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](integral_constant.md) が `operator bool()` を持っていないためエラーになる。

