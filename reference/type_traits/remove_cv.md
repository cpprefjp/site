# remove_cv
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct remove_cv {
    using type = …;
  };

  template <class T>
  using remove_cv_t = typename remove_cv<T>::type; // C++14
}
```

## 概要
型の`const-volatile`修飾を除去する。


## 効果
`remove_cv`は、型`T`に含まれる最上位の`const-volatile`修飾を除去した型を、メンバ型`type`として定義する。


## 例
```cpp
#include <type_traits>

static_assert(std::is_same<
        std::remove_cv<const int>::type,
        int
    >::value,
    "transform from const int to int");

static_assert(std::is_same<
        std::remove_cv<const volatile int>::type,
        int
    >::value,
    "transform from const volatile int to int");

static_assert(std::is_same<
        std::remove_cv<const int*>::type,
        const int*
    >::value,
    "transform from const int* to const int*");

static_assert(std::is_same<
        std::remove_cv<const int&>::type,
        const int&
    >::value,
    "transform from const int& to const int&");

static_assert(std::is_same<
        std::remove_cv<int* const>::type,
        int*
    >::value,
    "transform from int* const to int*");

int main() {}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0
	- `remove_cv_t`は12.0から


## 参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

