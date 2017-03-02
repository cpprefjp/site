#add_cv
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct add_cv {
    using type = …;
  };

  template <class T>
  using add_cv_t = typename add_cv<T>::type; // C++14
}
```

##概要
型を`const-volatile`修飾する。


##効果
`add_cv`は、型`T`に`const`修飾および`volatile`修飾両方を付加した型を、メンバ型`type`として定義する。  
型`T`が参照、関数、すでに最上位が`const-volatile`修飾された型である場合は、型`T`をそのままメンバ型`type`として定義する。  


##例
```cpp
#include <type_traits>

static_assert(std::is_same<
        std::add_cv<int>::type,
        const volatile int
    >::value,
    "transform int to const volatile int");

static_assert(std::is_same<
        std::add_cv<int&>::type,
        int&
    >::value,
    "transform int& to int&");

static_assert(std::is_same<
        std::add_cv<int*>::type,
        int* const volatile
    >::value,
    "transform int* to int* const volatile");

static_assert(std::is_same<
        std::add_cv<const int>::type,
        const volatile int
    >::value,
    "transform const int to const volatile int");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0
	- `add_cv_t`は12.0から


##参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

