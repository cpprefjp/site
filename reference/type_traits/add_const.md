# add_const
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct add_const {
    using type = …;
  };

  template <class T>
  using add_const_t = typename add_const<T>::type; // C++14
}
```

## 概要
型を`const`修飾する。


## 効果
- `add_const`は、型`T`に`const`修飾を付加した型を、メンバ型`type`として定義する。
- 型`T`が参照、関数、すでに最上位が`const`修飾された型である場合は、型`T`をそのままメンバ型`type`として定義する。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_same<std::add_const<int>::type, const int>::value, "transform int to const int");
static_assert(std::is_same<std::add_const<int&>::type, int&>::value, "transform int& to int&");
static_assert(std::is_same<std::add_const<int*>::type, int* const>::value, "transform int* to int* const");
static_assert(std::is_same<std::add_const<const int>::type, const int>::value, "transform const int to const int");

int main() {}
```
* std::add_const[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015
	- `add_const_t`は2013から


## 参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

