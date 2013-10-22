#remove_const(C++11)
```cpp
namespace std {
  template <class T>
  struct remove_const;
}
```

##概要
型の`const`修飾を除去する。


##効果
`remove_const`は、型`T`に含まれる最上位の`const`修飾を除去した型を、メンバ型`type`として定義する。


##例
```cpp
#include <type_traits>

static_assert(std::is_same<
        std::remove_const<const int>::type,
        int
    >::value,
    "transform from const int to int");

static_assert(std::is_same<
        std::remove_const<const volatile int>::type,
        volatile int
    >::value,
    "transform from const volatile int to volatile int");

static_assert(std::is_same<
        std::remove_const<const int&>::type,
        const int&
    >::value,
    "transform from const int& to const int&");

static_assert(std::is_same<
        std::remove_const<const int*>::type,
        const int*
    >::value,
    "transform from const int* to const int*");

static_assert(std::is_same<
        std::remove_const<const int* const>::type,
        const int*
    >::value,
    "transform from const int* const to const int*");

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


