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
  inline constexpr bool is_trivially_destructible_v
    = is_trivially_destructible<T>::value;          // C++17
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
### 基本的な使用例
```cpp example
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

#### 出力
```
```


### 包含する型がデストラクタを呼び出す必要があるかないかで、デストラクタの定義を分ける (C++11)
```cpp
#include <iostream>
#include <string>
#include <type_traits>

class TrivialBase {
public:
  ~TrivialBase() = default;
};

class NonTrivialBase {
public:
  ~NonTrivialBase() {
    std::cout << "destruct" << std::endl;
  }
};

template <class T>
class A : public std::conditional<
            std::is_trivially_destructible<T>::value,
            TrivialBase,
            NonTrivialBase
          >::type {
  T x;
};

int main()
{
  A<int> a;         // trivially destructible
  A<std::string> b; // non trivially destructible
}
```
* std::conditional[link conditional.md]

#### 出力
```
destruct
```

### 包含する型がデストラクタを呼び出す必要があるかないかで、デストラクタの定義を分ける (C++20)
```cpp
#include <iostream>
#include <string>
#include <type_traits>

template <class T>
class A {
  T x;
public:
  ~A() requires(!std::is_trivially_destructible_v<T>) {
    std::cout << "destruct" << std::endl;
  }

  ~A() = default;
};

int main()
{
  A<int> a;         // trivially destructible
  A<std::string> b; // non trivially destructible
}
```

#### 出力
```
destruct
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.8.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


#### 備考
- Clang 12.0時点では、コンセプトによるデストラクタのオーバーロードはサポートされておらず、コンパイルエラーになるか、もしくはオーバーロードしたデストラクタが動作しない。[Bug 50570 - Clang either crashes or choose wrong destructor when using multiple destructors using C++20 constraints](https://bugs.llvm.org/show_bug.cgi?id=50570)


## 関連項目
- [`std::optional`のデストラクタ](/reference/optional/optional/op_destructor.md)
- [`std::variant`のデストラクタ](/reference/variant/variant/op_destructor.md)
- [`std::vector`のデストラクタ](/reference/vector/vector/op_destructor.md)


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
- [An Example that Omits Destructor Calls For Types with Trivial Destructors](http://www.boost.org/doc/libs/1_65_1/libs/type_traits/doc/html/boost_typetraits/examples/destruct.html)
    - デストラクタを呼び出す必要のない型の配列に対して、デストラクタを呼び出すループを省略する最適化の例
- [Multiple destructors with C++ concepts - Sandor Dargo's Blog](https://www.sandordargo.com/blog/2021/06/16/multiple-destructors-with-cpp-concepts)
