#remove_reference(C++11)
```cpp
namespace std {
  template <class T>
  struct remove_reference;
}
```

##概要
型の`const`修飾を除去する。


##効果
`remove_reference`は、型`T`が何らかの型`U`への参照である場合、型に含まれる参照を除去した型`U`を、メンバ型`type`として定義する。


##例
```cpp
#include <type_traits>

static_assert(std::is_same<std::remove_reference<int>::type, int>::value, "transform int to int");
static_assert(std::is_same<std::remove_reference<int&>::type, int>::value, "transform int& to int");
static_assert(std::is_same<std::remove_reference<int&&>::type, int>::value, "transform int&& to int");

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


