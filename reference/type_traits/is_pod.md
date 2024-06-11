# is_pod
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]
* cpp20deprecated[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_pod;

  template <class T>
  inline constexpr bool is_pod_v = is_pod<T>::value; // C++17
}
```

このトレイトはC++20で非推奨になった。同時にPODという概念自体が非推奨になった。

## 概要
型`T`がPOD型 (Plain Old Data) か調べる。POD型は、トリビアル型、かつスタンダードレイアウト型、およびそのcv修飾を含む。


## 要件
型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。


## 効果
`is_pod`は、型`T`がPOD型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
"Plain Old Data"という名称はつまり、C言語の構造体や共用体と互換性を持つためである。

## 非推奨の詳細 (C++20)

C++11でPODをトリビアルとスタンダードレイアウトという２つの概念に分離した。  
そして実用上必要だったのはトリビアル型ではなく[トリビアルコピー可能](is_trivially_copyable.md)型、もしくは[スタンダードレイアウト](is_standard_layout.md)型であった。  
結果として、トリビアル型かつスタンダードレイアウト型というあまりに強すぎる制約を課すPODというのは、もはや定義だけされて使われていないものとなっていた。
したがって、規格書の文面でPODという用語に依存している部分は他の説明に書き換え、非推奨にすることとした。

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

static_assert(std::is_pod<const volatile int>::value == true, "const volatile int is POD");

struct POD_struct{};
struct non_POD_struct {
  non_POD_struct() {}    // デフォルトコンストラクタが非トリビアル
};
static_assert(std::is_pod<POD_struct>::value == true, "POD_struct is POD");
static_assert(std::is_pod<non_POD_struct>::value == false, "non_POD_struct is not POD");

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
- [GCC](/implementation.md#gcc): 4.3.4 [mark verified], 4.5.3 [mark verified], 4.6.2 [mark verified], 4.7.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2008～2012は、`void`とPODなクラスへの参照（上記例のうち`POD_struct&`）において、誤って`false_type`になっている。
	- 2013のみは、組込型への参照において、誤って`false_type`になっている。

#### 備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 2010 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


## 参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。」に変更された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
- [CWG issue 2323. Expunge POD](https://wg21.cmeerw.net/cwg/issue2323)
- [P0488R0 WG21 Working Paper, NB Comments, ISO/IEC CD 14882 #US 101](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0488r0.pdf#US101)
- [P0767R1: Deprecate POD](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0767r1.html)
