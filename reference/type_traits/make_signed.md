#make_signed (C++11)
* type_traits[meta header]

```cpp
namespace std {
  template <class T>
  struct make_signed {
    typedef … type;
  };

  template <class T>
  using make_signed_t = typename make_signed<T>::type; // C++14
}
```

##概要
整数型を符号付きにする。


##要件
型`T`が、整数型もしくは列挙型(cv修飾を許容する)であること。ただし`bool`は許可されない。  


##効果
`make_signed`は、型`T`に対応する符号付き整数型を、メンバ型`type`として定義する。  
型`T`がcv修飾されていた場合は、メンバ型`type`にも同じcv修飾が付加される。  


##例
```cpp
#include <type_traits>

static_assert(std::is_same<
        std::make_signed<int>::type,
        int
    >::value,
    "transform int to int");

static_assert(std::is_same<
        std::make_signed<const unsigned int>::type,
        const int
    >::value,
    "transform const unsigned int to const int");

// my_enumと同じ幅を持つ符号付き整数型に変換
enum my_enum : unsigned int { A, B, C };
static_assert(std::is_same<
        std::make_signed<my_enum>::type,
        int
    >::value,
    "transform unsigned int based my_enum to int");

static_assert(std::is_same<
        std::make_signed<unsigned char>::type,
        signed char
    >::value,
    "transform unsigned char to signed char");

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


##参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

