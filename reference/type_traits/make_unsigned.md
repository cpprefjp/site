#make_unsigned (C++11)
```cpp
namespace std {
  template <class T>
  struct make_unsigned {
    typedef … type;
  };
}
```

##概要
整数型を符号なしにする。


##要件
型`T`が、整数型もしくは列挙型(cv修飾を許容する)であること。ただし`bool`は許可されない。  


##効果
`make_unsigned`は、型`T`に対応する符号なし整数型を、メンバ型`type`として定義する。  
型`T`がcv修飾されていた場合は、メンバ型`type`にも同じcv修飾が付加される。  


##例
```cpp
#include <type_traits>

static_assert(std::is_same<
        std::make_unsigned<unsigned int>::type,
        unsigned int
    >::value,
    "transform unsigned int to unsigned int");

static_assert(std::is_same<
        std::make_unsigned<const int>::type,
        const unsigned int
    >::value,
    "transform const int to const unsigned int");

// my_enumと同じ幅を持つ符号なし整数型に変換
enum my_enum : int { A, B, C };
static_assert(std::is_same<
        std::make_unsigned<my_enum>::type,
        unsigned int
    >::value,
    "transform int based my_enum to unsigned int");

static_assert(std::is_same<
        std::make_unsigned<signed char>::type,
        unsigned char
    >::value,
    "transform signed char to unsigned char");

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
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


