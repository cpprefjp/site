# underlying_type
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

## 概要
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


## 要件
- C++11 : 型`T`が列挙型であること。(完全型を要求するかどうかは未規定)
- C++14 : 型`T`が完全な列挙型であること。
- C++20 : 型`T`が不完全な列挙型ではないこと。(満たさない場合不適格)

## 効果
`underlying_type`は、列挙型`T`の基底型を、メンバ型`type`として定義する。

C++20からは`T`が列挙型ではない場合、`type`は定義されない。
これによりSFINAEの文脈で使うときにこれまで不適格となるために列挙型以外の型のときに実体化を防ぐ必要があったところをその必要がなくなった。

```cpp example
#include <type_traits>
/**
Tが列挙型ではないときも、std::underlying_type_t<T>が実体化してしまっているため不適格
template<class T>
std::enable_if_t<std::is_enum<T>::value, std::underlying_type_t<T>>
foo(T t) { return static_cast<underlying_type_wrap_t<T>>(t); }
*/
#if 1
// p0340r3が適用されていない処理系
template<typename T, bool is_enum>
struct underlying_type_wrap_impl {};
template<typename T>
struct underlying_type_wrap_impl<T, true> : std::underlying_type<T> {};//列挙型に対する特殊化なのでOK
template<typename T>
struct underlying_type_wrap : underlying_type_wrap_impl<T, std::is_enum<T>::value> {};
template<typename T>
using underlying_type_wrap_t = typename underlying_type_wrap<T>::type;

template<typename T>
underlying_type_wrap_t<T> foo(T t) { return static_cast<underlying_type_wrap_t<T>>(t); }
#else
// C++20またはp0340r3が適用された処理系
// => 上のようなラッパーはいらない
template<typename T>
std::underlying_type_t<T> foo(T t) { return static_cast<std::underlying_type_t<T>>(t); }
#endif
template<typename T, std::enable_if_t<std::is_integral<T>::value, std::nullptr_t> = nullptr>
T foo(T t) { return t; }
enum class bar {
    hoge
};
int main(){
    return foo(bar::hoge) + foo(0);
}
```

## 例
```cpp example
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
* std::underlying_type[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
#### underlying_type
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

#### P0340R3: Making `std::underlying_type` SFINAE-friendly

以下の処理系ではコンパイル時の言語バージョンスイッチに関わらずP0340R3の修正が適用されている

- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 5 [mark verified]

## 関連項目
- [C++11 スコープを持つ列挙型](/lang/cpp11/scoped_enum.md)
- [`to_underlying()`](/reference/utility/to_underlying.md)


## 参照
- [N2947 Additional Type Traits for C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2947.html)
    - 最初は`enum_base`という名前で提案されていた
- [N2984 Additional Type Traits for C++0x (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2984.htm)
    - `enum_base`から`underlying_type`という名前に変更された
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
- [LWG Issue 2396. underlying_type doesn't say what to do for an incomplete enumeration type](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2396)
- [D0340R2: Making std::underlying_type SFINAE-friendly](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0340r2.html)
- [P0340R3: Making std::underlying_type SFINAE-friendly](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0340r3.html)
