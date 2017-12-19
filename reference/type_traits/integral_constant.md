# integral_constant
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, T v>
  struct integral_constant {
    static constexpr T value = v;

    using value_type = T;
    using type       = integral_constant<T,v>;

    constexpr operator value_type()          { return value; } // C++11
    constexpr operator value_type() noexcept { return value; } // C++14

    constexpr value_type operator()() const noexcept { return value; } // C++14
  };
}
```

## 概要
`integral_constant` は基本となる整数型と定数を合わせ，型として整数定数を表す。

多くの場合、`<type_traits>` 内のクラスやその他クラスから基本型として派生されることによって用いられる。


## 例
```cpp example
#include <type_traits>

using int_zero = std::integral_constant<int, 0>;

static_assert(int_zero::value == 0, "value == 0");
static_assert(std::is_same<int_zero::value_type, int>::value, "value_type == int");
static_assert(std::is_same<int_zero::type, int_zero>::value, "type == int_zero");
static_assert(int_zero() == 0, "int_zero() == 0");

int main(){}
```
* std::integral_constant[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015
	- `operator value_type`関数の実装状況は次のとおり。
		- 2012～2013は、`operator value_type() const`と定義されている。`constexpr`と`noexcept`修飾がされていない。
		- 2015では、C++14の仕様どおりに実装されている。
	- `operator()`関数は、2015から実装されている。

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 2010 は [`integral_constant`](integral_constant.md) が `operator value_type()` を持っていないためエラーになる。


## 関連項目
- [`bool_constant`](bool_constant.md)
- [`true_type`](true_type.md)
- [`false_type`](false_type.md)


## 参照
- [N3545 An Incremental Improvement to `integral_constant`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3545.pdf)
- [LWG defects 2346. `integral_constant`'s member functions should be marked `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2346)
- [N3669 Fixing constexpr member functions without const](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3669.pdf)

