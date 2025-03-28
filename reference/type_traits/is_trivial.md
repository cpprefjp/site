# is_trivial
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp26deprecated[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_trivial;

  template <class T>
  inline constexpr bool is_trivial_v = is_trivial<T>::value; // C++17
}
```

この型は、C++26で非推奨となった。

代わりの機能として、以下を使用すること：

- [`std::is_trivially_default_constructible`](is_trivially_default_constructible.md)
- [`std::is_trivially_copyable`](is_trivially_copyable.md)
- [`std::is_trivially_copy_assignable`](is_trivially_copy_assignable.md)

## 概要
型`T`がトリビアル型か調べる。トリビアル型は、トリビアルコピー可能、かつトリビアルなデフォルトコンストラクタを持つ型、およびそのcv修飾を含む。


## 要件
型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。


## 効果
`is_trivial`は、型`T`がトリビアル型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
スカラ型は、トリビアル型の要件を満たす。トリビアル型の配列は、トリビアル型の要件を満たす。


## 非推奨の詳細
この機能は、トリビアルにコピー可能かと、トリビアルにデフォルト構築可能かの2つをチェックする。しかし、これら2つのチェックは異なる場面で必要となるため、この機能が必要となる状況がほとんどなかった。

そのため、以下の個別要件をチェックする型を使用することを推奨し、本機能は非推奨とした。

- [`std::is_trivially_default_constructible`](is_trivially_default_constructible.md)
- [`std::is_trivially_copyable`](is_trivially_copyable.md)
- [`std::is_trivially_copy_assignable`](is_trivially_copy_assignable.md)


## 例
```cpp example
#include <type_traits>

static_assert(std::is_trivial<int>::value == true, "value == true, int is trivial");
static_assert(std::is_same<std::is_trivial<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_trivial<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_trivial<int>() == true, "is_trivial<int>() == true");

static_assert(std::is_trivial<int&>::value == false, "value == false, int& is not trivial");
static_assert(std::is_same<std::is_trivial<int&>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_trivial<int&>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_trivial<int&>() == false, "is_trivial<int&>() == false");

static_assert(std::is_trivial<const volatile int>::value == true, "const volatile int is trivial");

class trivial_class{};
struct non_trivial_class {
  non_trivial_class() {}    // デフォルトコンストラクタが非トリビアル
};
static_assert(std::is_trivial<trivial_class>::value == true, "trivial_class is trivial");
static_assert(std::is_trivial<trivial_class&>::value == false, "trivial_class& is not trivial");
static_assert(std::is_trivial<non_trivial_class>::value == false, "non_trivial_class is not trivial");
static_assert(std::is_trivial<non_trivial_class&>::value == false, "non_trivial_class& is not trivial");

int main(){}
```
* std::is_trivial[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.4 [mark verified], 4.5.3 [mark verified], 4.6.2 [mark verified], 4.7.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2010は、クラスへの参照型（上記例のうち`trivial_class&`）において、誤って`false_type`になっている。

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 2010 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


## 参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。」に変更された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
- [P3247R2: Deprecate the notion of trivial types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3247r2.html)
    - C++26で非推奨化
