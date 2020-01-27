# is_copy_constructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_copy_constructible;

  template <class T>
  inline constexpr bool is_copy_constructible_v
    = is_copy_constructible<T>::value;          // C++17
}
```

## 概要
型`T`がコピー構築可能か調べる


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_copy_constructible`は、型`T`がコピー構築可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

以下の条件が`true`である場合に、コピー構築可能であると見なされる：

- C++11 : [`is_constructible`](is_constructible.md)`<T, const T&>::value == true`
- C++14 : 参照可能な型`T`に対しては、[`is_constructible`](is_constructible.md)`<T, const T&>::value == true`と同じ結果となり、それ以外は`false`と見なされる。
    - 参照可能な型とは、以下のいずれかの条件に合致する型である：
        - [オブジェクト型](is_object.md)
        - CV修飾されていない、もしくは参照修飾されていない関数型
        - 参照修飾されている型


## 例
```cpp example
#include <type_traits>

struct s {
  s(const s&) = delete;
  // コピーコンストラクタは = delete されている。
  // そのためコピーコンストラクトできない。
};

static_assert(std::is_copy_constructible<int>::value == true, "value == true, int is copy constructible");
static_assert(std::is_same<std::is_copy_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_copy_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_copy_constructible<int>() == true, "is_copy_constructible<int>() == true");

static_assert(std::is_copy_constructible<s>::value == false, "value == false, s is not copy constructible");
static_assert(std::is_same<std::is_copy_constructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_copy_constructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_copy_constructible<s>() == false, "is_copy_constructible<s>() == false");

static_assert(std::is_copy_constructible<double>::value == true, "double is copy constructible");
static_assert(std::is_copy_constructible<const int>::value == true, "const int is copy constructible");
static_assert(std::is_copy_constructible<void*>::value == true, "void* is copy constructible");
static_assert(std::is_copy_constructible<int&>::value == true, "int& is copy constructible");

static_assert(std::is_copy_constructible<int[1]>::value == false, "int[1] is not copy constructible");
static_assert(std::is_copy_constructible<int[]>::value == false, "int[] is not copy constructible");
static_assert(std::is_copy_constructible<void>::value == false, "void is not copy constructible");
static_assert(std::is_copy_constructible<int&&>::value == false, "int&& is not copy constructible");
static_assert(std::is_copy_constructible<int ()>::value == false, "int () is not copy constructible");

int main(){}
```
* std::is_copy_constructible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012～2013には、提案時の名前である`has_copy_constructor`も�在する。
	- 2012は、`is_copy_constructible<void>`が誤って`true_type`になっている。
	- 2012～2013は、C++11の定義に基づく実装となっている。
		- 2012～2013は、上記例のうち`is_copy_constructible<s>`に関するものにおいて、誤った結果になる。これは、[`is_constructible`](is_constructible.md)の不具合に由来する。
		- 2012は、左辺値参照型において`true_type`になっている。具体的には、上記例のうち`is_copy_constructible<int&>`が該当する。


## 参照
- [N2983 Allowing Move Constructors to Throw](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2983.html)
- [LWG Issue 2196. Specification of `is_*[copy/move]_[constructible/assignable]` unclear for non-referencable types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2196)
    - C++11では、この型特性が参照型に対してどのような振る舞いになるのか不明確であったため、C++14で明確化された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
