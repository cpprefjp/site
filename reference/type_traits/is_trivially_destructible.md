# is_trivially_destructible
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_trivially_destructible;

  template <class T>
  constexpr bool is_trivially_destructible_v
    = is_trivially_destructible<T>::value;   // C++17
}
```

## 概要
型`T`がトリビアルに破棄可能か調べる。


## 要件
型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`is_trivially_destructible`は、`T`がトリビアルに破棄可能な型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

「トリビアルに破棄可能」とは、ユーザー定義されないデストラクタを持っているということを意味する。


## 例
```cpp
#include <type_traits>

struct C1 {
  // トリビアルなデストラクタを持っている

  // 特殊関数ではないメンバ関数は持っている
  int f(int x) const { return x; }
};

struct C2 {
  // 非トリビアルなデストラクタを持っている
  ~C2() {}
};

// 組み込み型は全てトリビアルに破棄可能
static_assert(std::is_trivially_destructible<int>::value == true, "int is trivially destructible");
static_assert(std::is_trivially_destructible<int*>::value == true, "int* is trivially destructible");

// ユーザー定義型は、ユーザー定義のデストラクタを持っていなければトリビアルに破棄可能
static_assert(std::is_trivially_destructible<C1>::value == true, "C1 is trivially destructible");
static_assert(std::is_trivially_destructible<C2>::value == false, "C2 isn't trivially destructible");

int main() {}
```
* std::is_trivially_destructible[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.8.2
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
