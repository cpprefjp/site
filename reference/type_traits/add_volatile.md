#add_volatile (C++11)
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  struct add_volatile {
    typedef … type;
  };

  template <class T>
  using add_volatile_t = typename add_volatile<T>::type; // C++14
}
```

##概要
型を`volatile`修飾する。


##効果
`add_volatile`は、型`T`に`volatile`修飾を付加した型を、メンバ型`type`として定義する。  
型`T`が参照、関数、すでに最上位が`volatile`修飾された型である場合は、型`T`をそのままメンバ型`type`として定義する。  


##例
```cpp
#include <type_traits>

static_assert(std::is_same<std::add_volatile<int>::type, volatile int>::value, "transform int to volatile int");
static_assert(std::is_same<std::add_volatile<int&>::type, int&>::value, "transform int& to int&");
static_assert(std::is_same<std::add_volatile<int*>::type, int* volatile>::value, "transform int* to int* volatile");
static_assert(std::is_same<std::add_volatile<volatile int>::type, volatile int>::value, "transform volatile int to volatile int");

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
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

