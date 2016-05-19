#true_type
* type_traits[meta header]
* std[meta namespace]
* typedef[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  typedef integral_constant<bool, true> true_type;
}
```
* integral_constant[link integral_constant.md]

##概要
`true_type`は、`true`定数を表す型である。コンパイル時の条件式を扱うために使用される。


##例
```cpp
#include <type_traits>

static_assert(std::true_type::value == true, "value == true");
static_assert(std::is_same<std::true_type::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::true_type::type, std::true_type>::value, "type == true_type");
static_assert(std::true_type() == true, "true_type() == true");

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
- [Visual C++](/implementation.md#visual_cpp) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](integral_constant.md) が `operator value_type()` を持っていないためエラーになる。


##関連項目
- [`integral_constant`](integral_constant.md)
- [`false_type`](false_type.md)


##参照
- [N3545 An Incremental Improvement to `integral_constant`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3545.pdf)
- [LWG defects 2346. `integral_constant`'s member functions should be marked `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2346)
- [N3669 Fixing constexpr member functions without const](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3669.pdf)

