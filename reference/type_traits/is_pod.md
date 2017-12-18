# is_pod
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_pod;

  template <class T>
  constexpr bool is_pod_v = is_pod<T>::value; // C++17
}
```

## 概要
型`T`がPOD型 (Plane Old Data) か調べる。POD型は、トリビアル型、かつスタンダードレイアウト型、およびそのcv修飾を含む。


## 要件
型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。


## 効果
`is_pod`は、型`T`がPOD型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
"Plane Old Data"という名称はつまり、C言語の構造体や共用体と互換性を持つためである。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_pod<int>::value == true, "value == true, int is POD");
static_assert(std::is_same<std::is_pod<int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_pod<int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_pod<int>() == true, "is_pod<int>() == true");

static_assert(std::is_pod<int&>::value == false, "value == false, int& is not POD");
static_assert(std::is_same<std::is_pod<int&>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_pod<int&>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_pod<int&>() == false, "is_pod<int&>() == false");

static_assert(std::is_pod<const volatile int>::value == true, "value == true, const volatile int is POD");
static_assert(std::is_pod<int&>::value == false, "value == true, int& is not POD");

struct POD_struct{};
struct non_POD_struct {
  non_POD_struct() {}    // デフォルトコンストラクタが非トリビアル
};
static_assert(std::is_pod<POD_struct>::value == true, "value == true, POD_struct is POD");
static_assert(std::is_pod<non_POD_struct>::value == false, "value == true, non_POD_struct is not POD");

int main(){}
```
* std::is_pod[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015
	- 2008～2012は、`void`とPODなクラスへの参照（上記例のうち`POD_struct&`）において、誤って`false_type`になっている。
	- 2013のみは、組込型への参照において、誤って`false_type`になっている。

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


## 参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。」に変更された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
