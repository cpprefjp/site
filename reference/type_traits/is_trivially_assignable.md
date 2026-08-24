# is_trivially_assignable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct is_trivially_assignable;

  template <class T, class U>
  inline constexpr bool is_trivially_assignable_v
    = is_trivially_assignable<T, U>::value;       // C++17
}
```

## 概要
型`T`が型`U`からトリビアルに代入可能か調べる。


## 要件
型`T`と型`U`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_trivially_assignable`は、型`T`が型`U`からトリビアルに代入可能であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

「トリビアルに代入可能」とは、[`is_assignable`](is_assignable.md)`<T, U>::value == true`であり、かつ`declval<T>() = declval<U>()`という代入が、トリビアルでない操作を呼び出さないことが分かっていることを意味する。


## 備考
- このトレイトの定義においては、`declval<T>()`という関数呼び出しは、トリビアルな関数呼び出しであり、かつ[`declval`](/reference/utility/declval.md)のODR使用ではないものとみなされる。
    - [`declval`](/reference/utility/declval.md)は特殊メンバ関数ではないため、この規定がなければ、代入式は必ず「トリビアルでない操作の呼び出し」を含むことになり、このトレイトは常に`false`となってしまう。


## 例
```cpp example
#include <type_traits>
#include <string>

struct X {
  // トリビアルな代入演算子を持っている
};

struct Y {
  // 非トリビアルな代入演算子を持っている
  Y& operator=(const Y&) { return *this; }
};

struct Z {
  // 非トリビアルな代入演算子を持つ型を包含している
  std::string s;

  // Z型は非トリビアルな代入演算子を持つ
};

// 組み込み型は全てトリビアルに代入可能
static_assert(
  std::is_trivially_assignable<int&, const int&>::value == true,
  "int is trivially assignable");

// トリビアルな代入演算子を持っている型
static_assert(
  std::is_trivially_assignable<X&, const X&>::value == true,
  "X is trivially assignable");

// 非トリビアルな代入演算子を持っている型
static_assert(
  std::is_trivially_assignable<Y&, const Y&>::value == false,
  "Y isn't trivially assignable");

// 非トリビアルな代入演算子を持つ型を包含する型
static_assert(
  std::is_trivially_assignable<Z&, const Z&>::value == false,
  "Z isn't trivially assignable");

int main() {}
```
* std::is_trivially_assignable[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2012は、`is_assignable<T, U>`と同一の実装になっている。


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
- [LWG Issue 2336. `is_trivially_constructible`/`is_trivially_assignable` traits are always false](https://cplusplus.github.io/LWG/issue2336)
    - C++17で、`declval<T>()`の呼び出しをトリビアルとみなすよう規定が修正され、これらのトレイトが常に`false`となる文言上の欠陥が解消された
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。文言上の欠陥の修正であり、処理系は当初から正しい結果を返していたため
