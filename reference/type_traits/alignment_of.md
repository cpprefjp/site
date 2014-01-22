#alignment_of(C++11)
```cpp
namespace std {
  template <class T>
  struct alignment_of {
    static constexpr std::size_t value = …;
  };
}
```

##概要
型`T`のアラインメントを取得する。


##要件
型`T`に対して`alignof(T)`が有効であること。


##効果
`alignof(T)`で得られた`std::size_t`型の値を、メンバ定数`value`として定義する。


##例
```cpp
#include <type_traits>
#include <iostream>

int main()
{
  constexpr std::size_t n = std::alignment_of<int>::value;
  std::cout << n << std::endl;
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.6.4
- [Visual C++](/implementation#visual_cpp.md): ??


