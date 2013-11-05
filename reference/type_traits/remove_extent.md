#remove_extent(C++11)
```cpp
namespace std {
  template <class T>
  struct remove_extent;
}
```

##概要
配列型`T`から次元を除去する。


##効果
`remove_extent`は、型`T`が、何らかの型`U`の配列型である場合は`U`型を、そうでなければ型`T`をメンバ型`type`として定義する。


##例
```cpp
#include <type_traits>

static_assert(std::is_same<
        std::remove_extent<int>::type,
        int
    >::value,
    "transform int to int");

static_assert(std::is_same<
        std::remove_extent<const int[2]>::type,
        const int
    >::value,
    "transform const int[2] to const int");

static_assert(std::is_same<
        std::remove_extent<int[2][4]>::type,
        int[4]
    >::value,
    "transform int[2][4] to int[4]");

static_assert(std::is_same<
        std::remove_extent<int[][2]>::type,
        int[2]
    >::value,
    "transform int[][2] to int[2]");

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


