#add_const(C++11)
```cpp
namespace std {
  template <class T>
  struct add_const;
}
```

##概要
型を`const`修飾する。


##効果
`add_const`は、型`T`に`const`修飾を付加した型を、メンバ型`type`として定義する。  
型`T`が参照、関数、すでに最上位が`const`修飾された型である場合は、型`T`をそのままメンバ型`type`として定義する。  


##例
```cpp
#include <type_traits>

static_assert(std::is_same<std::add_const<int>::type, const int>::value, "transform int to const int");
static_assert(std::is_same<std::add_const<int&>::type, int&>::value, "transform int& to int&");
static_assert(std::is_same<std::add_const<int*>::type, int* const>::value, "transform int* to int* const");
static_assert(std::is_same<std::add_const<const int>::type, const int>::value, "transform const int to const int");

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


