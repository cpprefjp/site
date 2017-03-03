#underlying_type
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct underlying_type {
    using type = …;
  };

  template <class T>
  using underlying_type_t = typename underlying_type<T>::type; // C++14
}
```

##概要
列挙型の基底型を取得する。

C++11以降の列挙型(`enum`／`enum class`／`enum struct`で定義された型)は、列挙子の値を表現するための基底型を指定できる：

```cpp
// 基底型にcharを指定。
// 列挙子の値を表現するためにcharが使用される。
enum class CharColor : char {
  Red, Green, Blue
};

// 基底型を指定しない場合、
// enum classではintがデフォルトの基底型となる。
enum class IntColor {
  Red, Green Blue
};
```

`underlying_type`を使用することで、列挙型に設定された基底型を取得できる。


##要件
- C++11 : 型`T`が列挙型であること。(完全型を要求するかどうかは未規定)
- C++14 : 型`T`が完全な列挙型であること。


##効果
`underlying_type`は、列挙型`T`の基底型を、メンバ型`type`として定義する。  


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
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


##関連項目
- [C++11 スコープを持つ列挙型](/lang/cpp11/scoped_enum.md)


##参照
- [N2947 Additional Type Traits for C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2947.html)
    - 最初は`enum_base`という名前で提案されていた
- [N2984 Additional Type Traits for C++0x (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2984.htm)
    - `enum_base`から`underlying_type`という名前に変更された
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
- [LWG Issue 2396. underlying_type doesn't say what to do for an incomplete enumeration type](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2396)

