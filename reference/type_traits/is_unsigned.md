#is_unsigned (C++11)
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  struct is_unsigned;
}
```

##概要
型`T`が符号なし算術型か調べる


##効果
`is_unsigned`は、型`T`が符号なし算術型 (cv修飾を許容する) であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。

符号なし算術型と見なす条件は以下：

- C++11 : [`is_arithmetic`](./is_arithmetic.md)`<T>::value && T(0) < T(-1)`
- C++14 : [`is_arithmetic`](./is_arithmetic.md)`<T>::value == true`の場合、[`integral_constant`](./integral_constant-true_type-false_type.md)`<bool, T(0) < T(-1)>::value`の結果を真偽の結果とする。そうでなければ偽の結果とする。
    - 備考： `T`が算術型以外だった場合に、`T(0)`、`T(-1)`でテンプレートの置き換えが発生してしまうため、このような文言になっている。


##例
```cpp
#include <type_traits>

static_assert(std::is_unsigned<unsigned int>::value == true, "value == true, unsigned int is unsigned");
static_assert(std::is_same<std::is_unsigned<unsigned int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_unsigned<unsigned int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_unsigned<unsigned int>() == true, "is_unsigned<unsigned int>() == true");

static_assert(std::is_unsigned<int>::value == false, "value == false, int is not unsigned");
static_assert(std::is_same<std::is_unsigned<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_unsigned<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_unsigned<int>() == false, "is_unsigned<int>() == false");

static_assert(std::is_unsigned<const volatile unsigned int>::value == true, "value == true, const volatile unsigned int is unsigned");
static_assert(std::is_unsigned<unsigned int&>::value == false, "value == true, unsigned int& is not unsigned");

class c{};
static_assert(std::is_unsigned<float>::value == false, "value == true, float is not unsigned");
static_assert(std::is_unsigned<c>::value == false, "value == true, class is not unsigned");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


##参照
- [LWG Issue 2197. Specification of `is_[un]signed` unclear for non-arithmetic types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2197)

