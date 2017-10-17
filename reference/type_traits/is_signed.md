# is_signed
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_signed;

  template <class T>
  constexpr bool is_signed_v = is_signed<T>::value; // C++17
}
```

## 概要
型`T`が符号付き算術型か調べる


## 効果
`is_signed`は、型`T`が符号付き算術型 (cv修飾を許容する) であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

符号付き算術型と見なす条件は以下：

- C++11 : [`is_arithmetic`](is_arithmetic.md)`<T>::value && T(-1) < T(0)`
- C++14 : [`is_arithmetic`](is_arithmetic.md)`<T>::value == true`の場合、[`integral_constant`](integral_constant.md)`<bool, T(-1) < T(0)>::value`の結果を真偽の結果とする。そうでなければ偽の結果とする。
    - 備考： `T`が算術型以外だった場合に、`T(0)`、`T(-1)`でテンプレートの置き換えが発生してしまうため、このような文言になっている。


## 例
```cpp
#include <type_traits>

static_assert(std::is_signed<int>::value == true, "value == true, int is signed");
static_assert(std::is_same<std::is_signed<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_signed<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_signed<int>() == true, "is_signed<int>() == true");

static_assert(std::is_signed<unsigned int>::value == false, "value == false, unsigned int is not signed");
static_assert(std::is_same<std::is_signed<unsigned int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_signed<unsigned int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_signed<unsigned int>() == false, "is_signed<unsigned int>() == false");

static_assert(std::is_signed<const volatile int>::value == true, "value == true, const volatile int is signed");
static_assert(std::is_signed<int&>::value == false, "value == true, int& is not signed");

class c{};
static_assert(std::is_signed<float>::value == true, "value == true, float is signed");
static_assert(std::is_signed<c>::value == false, "value == true, class is not signed");

int main(){}
```
* std::is_signed[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0
	- 9.0は、TR1の定義に基づく実装となっている。すなわち、`T`が整数型でなければ必ず`false_type`になる。上記例では`std::is_signed<float>`が該当する。

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


## 参照
- [LWG Issue 2197. Specification of `is_[un]signed` unclear for non-arithmetic types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2197)
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
