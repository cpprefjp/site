# is_nothrow_copy_constructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_nothrow_copy_constructible;

  template <class T>
  constexpr bool is_nothrow_copy_constructible_v
    = is_nothrow_copy_constructible<T>::value;   // C++17
}
```

## 概要
型`T`がコピー構築でき、かつそのコピーコンストラクタが例外を投げないか調べる


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_nothrow_copy_constructible`は、型`T`が例外を投げない保証のもとにコピー構築可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

以下の条件が`true`である場合に、例外を投げないコピー構築が可能であると見なされる：

- C++11 : [`is_nothrow_constructible`](is_nothrow_constructible.md)`<T, const T&>::value == true`
- C++14 : 参照可能な型`T`に対しては、[`is_nothrow_constructible`](is_nothrow_constructible.md)`<T, const T&>::value == true`と同じ結果となり、それ以外は`false`と見なされる。
    - 参照可能な型とは、以下のいずれかの条件に合致する型である：
        - [オブジェクト型](is_object.md)
        - CV修飾されていない、もしくは参照修飾されていない関数型
        - 参照修飾されている型

[`is_nothrow_constructible`](is_nothrow_constructible.md)`<T, T&>::value`では判断できないので注意。

## 例
```cpp example
#include <type_traits>

struct s {
  s(const s&) {
    throw 0;
  }
};

struct t {
  t(const t&) = delete;
  t(t&&) = default;
};

struct u {
  u(const u&) = default;
  u(u&&) = delete;
};

static_assert(std::is_nothrow_copy_constructible<int>::value == true, "value == true, int is nothrow copy constructible");
static_assert(std::is_same<std::is_nothrow_copy_constructible<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_nothrow_copy_constructible<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_nothrow_copy_constructible<int>() == true, "is_nothrow_copy_constructible<int>() == true");

static_assert(std::is_nothrow_copy_constructible<s>::value == false, "value == false, s is not nothrow copy constructible");
static_assert(std::is_same<std::is_nothrow_copy_constructible<s>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_nothrow_copy_constructible<s>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_nothrow_copy_constructible<s>() == false, "is_nothrow_copy_constructible<s>() == false");

static_assert(std::is_nothrow_copy_constructible<unsigned>::value == true, "unsigned is nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<const int>::value == true, "const int is nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<int&>::value == true, "int& is nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<void*>::value == true, "void* is nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<u>::value == true, "u is nothrow copy constructible");

static_assert(std::is_nothrow_copy_constructible<t>::value == false, "t is not nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<int[]>::value == false, "int[] is not nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<int[1]>::value == false, "int[1] is not nothrow copy constructible");
static_assert(std::is_nothrow_copy_constructible<void>::value == false, "void is not nothrow copy constructible");

int main(){}
```
* std::is_nothrow_copy_constructible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0, 4.8.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012～2013には、提案時の名前である`has_nothrow_copy`, `has_nothrow_copy_constructor`も存在する。
	- 2012は、すべてのクラス型において`true_type`になるかのような挙動を示した。上記例のうち`s`, `t`, `u`で`true_type`となった。ただし、2013で非対応の構文については適宜変更の上で試した。
	- 2013は、C++11に準拠する実装となっている。


## 参照
- [LWG Issue 2196. Specification of `is_*[copy/move]_[constructible/assignable]` unclear for non-referencable types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2196)
    - C++11では、この型特性が参照型に対してどのような振る舞いになるのか不明確であったため、C++14で明確化された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
