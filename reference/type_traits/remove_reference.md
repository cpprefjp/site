# remove_reference
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct remove_reference {
    using type = …;
  };

  template <class T>
  using remove_reference_t = typename remove_reference<T>::type; // C++14
}
```

## 概要
型から参照を除去する。


## 効果
`remove_reference`は、型`T`が何らかの型`U`への参照である場合、型に含まれる参照を除去した型`U`を、メンバ型`type`として定義する。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_same<std::remove_reference<int>::type, int>::value, "transform int to int");
static_assert(std::is_same<std::remove_reference<int&>::type, int>::value, "transform int& to int");
static_assert(std::is_same<std::remove_reference<int&&>::type, int>::value, "transform int&& to int");

int main() {}
```
* std::remove_reference[color ff0000]

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
	- `remove_reference_t`は2013から


## 参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

