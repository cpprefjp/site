#extent(C++11)
```cpp
namespace std {
  template <class T, unsigned int I = 0>
  struct extent {
    static constexpr std::size_t value = …;
  };
}
```

##概要
配列型の`I`番目の次元の要素数を取得する。


##効果
型`T`が配列型であり、配列の次元数が`I`より大きい場合、`I`次元目の要素数をメンバ定数`value`として定義する。  
型`T`が配列型ではない、もしくは配列の次元数が`I`以下の場合、値`0`をメンバ定数`value`として定義する。


##例
```cpp
#include <type_traits>

static_assert(std::extent<int[3][2], 0>::value == 3, "0th element count is 3");
static_assert(std::extent<int[3][2], 1>::value == 2, "1th element count is 2");

static_assert(std::extent<int[3][2], 2>::value == 0, "out of range");
static_assert(std::extent<int>::value == 0, "int isn't array type");

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


