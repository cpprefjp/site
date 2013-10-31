#add_lvalue_reference(C++11)
```cpp
namespace std {
  template <class T>
  struct add_lvalue_reference;
}
```

##概要
型に左辺値参照を追加する。


##効果
`add_lvalue_reference`は、型`T`の名前に`&`修飾を付加した型を、メンバ型`type`として定義する。  
型`T`が何らかのオブジェクト型もしくは関数型`U`への左辺値参照型である場合は、型`U&`をメンバ型`type`として定義する。  
型`T`が何らかのオブジェクト型もしくは関数型`U`への右辺値参照型である場合は、型`U&`をメンバ型`type`として定義する。  


##例
```cpp
#include <type_traits>

static_assert(std::is_same<std::add_lvalue_reference<int>::type, int&>::value, "transform int to int&");
static_assert(std::is_same<std::add_lvalue_reference<int&>::type, int&>::value, "transform int& to int&");
static_assert(std::is_same<std::add_lvalue_reference<int&&>::type, int&>::value, "transform int&& to int&");

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


