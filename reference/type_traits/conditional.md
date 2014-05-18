#conditional (C++11)
```cpp
namespace std {
  template <bool B, class T, class F>
  struct conditional {
    typedef … type;
  };
}
```

##概要
コンパイル時条件式。  
条件式が`true`か`false`かによって、使用する型を切り替える。


##効果
`conditional`は、条件式`B`が`true`であれば型`T`を、そうでなければ型`F`を、メンバ型`type`として定義する。  


##例
```cpp
#include <type_traits>

static_assert(std::is_same<std::conditional<true, int, char>::type, int>::value, "select int");
static_assert(std::is_same<std::conditional<false, int, char>::type, char>::value, "select char");

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


