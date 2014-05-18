#add_cv (C++11)
```cpp
namespace std {
  template <class T>
  struct add_cv {
    typedef … type;
  };
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
- [Clang](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.6
- [Visual C++](/implementation#visual_cpp.md): ??


