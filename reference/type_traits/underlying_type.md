#underlying_type (C++11)
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  struct underlying_type {
    typedef … type;
  };

  template <class T>
  using underlying_type_t = typename underlying_type<T>::type; // C++14
}
```

##概要
`enum`の基底型を取得する。


##要件
型`T`が列挙型であること。


##効果
`underlying_type`は、列挙型`T`の基底型を、メンバ型`type`として定義する。  


##備考
基底型が指定されていない場合の基底型は、固定ではない。  
全ての列挙値を表現できる整数型が使用されるが、具体的な型の規定は実装定義となる。


##例
```cpp
#include <type_traits>

enum E1 : char {};
enum class E2 : char {};

enum E3 {};
enum class E4 {};

static_assert(std::is_same<std::underlying_type<E1>::type, char>::value, "E1 based type is char");
static_assert(std::is_same<std::underlying_type<E2>::type, char>::value, "E2 based type is char");

static_assert(std::is_integral<std::underlying_type<E3>::type>::value == true, "E3 based type is integral type");
static_assert(std::is_integral<std::underlying_type<E4>::type>::value == true, "E4 based type is integral type");

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
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

