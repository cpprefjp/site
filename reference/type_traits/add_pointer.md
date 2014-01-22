#add_pointer(C++11)
```cpp
namespace std {
  template <class T>
  struct add_pointer {
    typedef … type;
  };
}
```

##概要
型にポインタを追加する。


##効果
`add_pointer`は、型[`remove_reference`](./remove_reference.md)`<T>::type*`を、メンバ型`type`として定義する。  


##例
```cpp
#include <type_traits>

static_assert(std::is_same<std::add_pointer<int>::type, int*>::value, "transform int to int*");
static_assert(std::is_same<std::add_pointer<int&>::type, int*>::value, "transform int& to int*");
static_assert(std::is_same<std::add_pointer<int*>::type, int**>::value, "transform int* to int**");
static_assert(std::is_same<std::add_pointer<int*&>::type, int**>::value, "transform int*& to int**");

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


