# add_lvalue_reference
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct add_lvalue_reference {
    using type = …;
  };

  template <class T>
  using add_lvalue_reference_t = typename add_lvalue_reference<T>::type; // C++14
}
```

## 概要
型に左辺値参照を追加する。


## 効果
- `add_lvalue_reference`は、型`T`の名前に`&`修飾を付加した型を、メンバ型`type`として定義する。
- 型`T`が何らかのオブジェクト型もしくは関数型`U`への左辺値参照型である場合は、型`U&`をメンバ型`type`として定義する。
- 型`T`が何らかのオブジェクト型もしくは関数型`U`への右辺値参照型である場合は、型`U&`をメンバ型`type`として定義する。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_same<std::add_lvalue_reference<int>::type, int&>::value, "transform int to int&");
static_assert(std::is_same<std::add_lvalue_reference<int&>::type, int&>::value, "transform int& to int&");
static_assert(std::is_same<std::add_lvalue_reference<int&&>::type, int&>::value, "transform int&& to int&");

int main() {}
```
* std::add_lvalue_reference[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015
	- 2008には、名前空間`std::tr1`に同じ効果の`add_reference`が�在する。これは提案時の名前である。
	- 2010～2013にも、名前空間`std`および`std::tr1`に`add_reference`が�在する。
	- `add_lvalue_reference_t`は2013から


## 参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

