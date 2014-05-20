#add_volatile (C++11)
```cpp
namespace std {
  template <class T>
  struct add_volatile {
    typedef … type;
  };
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
- [Clang](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.6
- [Visual C++](/implementation#visual_cpp.md): ??


