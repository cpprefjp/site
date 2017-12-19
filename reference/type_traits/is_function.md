# is_function
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_function;

  template <class T>
  constexpr bool is_function_v = is_function<T>::value; // C++17
}
```

## 概要
型`T`が関数型か調べる


## 効果
`is_function`は、型`T`が関数型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>

using f = void();

static_assert(std::is_function<f>::value == true, "value == true, f is function");
static_assert(std::is_same<std::is_function<f>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_function<f>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_function<f>() == true, "is_function<f>() == true");

static_assert(std::is_function<int>::value == false, "value == false, int is not function");
static_assert(std::is_same<std::is_function<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_function<int>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_function<int>() == false, "is_function<int>() == false");

static_assert(std::is_function<const f>::value == true, "const f is function");
static_assert(std::is_function<volatile f>::value == true, "volatile f is function");
static_assert(std::is_function<const volatile f>::value == true, "const volatile f is function");

static_assert(std::is_function<f*>::value == false, "f* is not function");
static_assert(std::is_function<f&>::value == false, "f& is not function");
static_assert(std::is_function<f&&>::value == false, "f&& is not function");

int main(){}
```
* std::is_function[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.5.3, 4.6.1, 4.7.0
- [Clang](/implementation.md#clang) 3.1, 3.2, 3.3
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015
	- 2010までは、関数への右辺値参照型をテンプレート実引数に渡すとコンパイルエラーになる。上記例では、`std::is_function<f&&>`の場合が該当する。

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 2010 は [`integral_constant`](integral_constant.md) が `operator bool()` を持っていないためエラーになる。また、Visual C++ 2010 はコンパイラのバグのために関数への右辺値参照を用いるとエラーになる。

Clang 3.1 - 3.3 では以下のような警告が出るが、これは[Clangのバグ](https://llvm.org/bugs/show_bug.cgi?id=16654)である。

```
prog.cc:15:32: warning: qualifier on function type 'f' (aka 'void ()') has unspecified behavior
static_assert(std::is_function<const f>::value == true, "const f is function");
                               ^~~~~~~
prog.cc:16:32: warning: qualifier on function type 'f' (aka 'void ()') has unspecified behavior
static_assert(std::is_function<volatile f>::value == true, "volatile f is function");
                               ^~~~~~~~~~
prog.cc:17:32: warning: qualifier on function type 'f' (aka 'void ()') has unspecified behavior
static_assert(std::is_function<const volatile f>::value == true, "const volatile f is function");
                               ^~~~~~~~~~~~~~~~
3 warnings generated.
```


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
