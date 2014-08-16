#remove_volatile (C++11)
```cpp
namespace std {
  template <class T>
  struct remove_volatile {
    typedef … type;
  };
}
```

##概要
型の`volatile`修飾を除去する。


##効果
`remove_volatile`は、型`T`に含まれる最上位の`volatile`修飾を除去した型を、メンバ型`type`として定義する。


##例
```cpp
#include <type_traits>

static_assert(std::is_same<
        std::remove_volatile<volatile int>::type,
        int
    >::value,
    "transform from volatile int to int");

static_assert(std::is_same<
        std::remove_volatile<volatile int&>::type,
        volatile int&
    >::value,
    "transform from volatile int& to volatile int&");

static_assert(std::is_same<
        std::remove_volatile<volatile int*>::type,
        volatile int*
    >::value,
    "transform from volatile int* to volatile int*");

static_assert(std::is_same<
        std::remove_volatile<int* volatile>::type,
        int*
    >::value,
    "transform from int* volatile to int*");

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


