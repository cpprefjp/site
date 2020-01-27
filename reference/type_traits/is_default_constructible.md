# is_default_constructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_default_constructible;

  template <class T>
  inline constexpr bool is_default_constructible_v
    = is_default_constructible<T>::value;          // C++17
}
```

## 概要
型`T`がデフォルト構築可能か調べる


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_default_constructible`は、型`T`がデフォルトコンストラクト可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

[`is_constructible`](is_constructible.md)`<T>::value == true`の時に、デフォルト構築可能であると判�される。


## 例
```cpp example
#include <type_traits>

struct s {
  s(int){}
  // デフォルトコンストラクタは暗黙に = delete されている。
  // そのためデフォルトコンストラクトできない。
};

static_assert(std::is_default_constructible<int>::value == true, "value == true, int is default constructible");
static_assert(std::is_same<std::is_default_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_default_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_default_constructible<int>() == true, "is_default_constructible<int>() == true");

static_assert(std::is_default_constructible<s>::value == false, "value == false, s is not default constructible");
static_assert(std::is_same<std::is_default_constructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_default_constructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_default_constructible<s>() == false, "is_default_constructible<s>() == false");

static_assert(std::is_default_constructible<double>::value == true, "double is default constructible");
static_assert(std::is_default_constructible<const int>::value == true, "const int is default constructible");
static_assert(std::is_default_constructible<int[1]>::value == true, "int[1] is default constructible");
static_assert(std::is_default_constructible<void*>::value == true, "void* is default constructible");

static_assert(std::is_default_constructible<int[]>::value == false, "int[] is not default constructible");
static_assert(std::is_default_constructible<void>::value == false, "void is not default constructible");
static_assert(std::is_default_constructible<int&>::value == false, "int& is not default constructible");
static_assert(std::is_default_constructible<int&&>::value == false, "int&& is not default constructible");
static_assert(std::is_default_constructible<int ()>::value == false, "int () is not default constructible");

int main(){}
```
* std::is_default_constructible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012～2013には、提案時の名前である`has_default_constructor`も�在する。
	- 2012～2013は、`std::is_default_constructible<int[]>`のような要素数の指定がない配列型において、誤って`true_type`になっている。`has_default_constructor`も同様である。

#### 備考
上の例でコンパイラによってはエラーになる。Clang 3.0 は `constexpr` に対応していないためにエラーになる。`operator bool` は持っているので、実行時に用いることはできる。


## 参照
- [N2983 Allowing Move Constructors to Throw](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2983.html)
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
