#tuple_element (C++11)
* tuple[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <size_t I, class T> class tuple_element; // 宣言のみで定義なし

  template <size_t I, class T> class tuple_element<I, const T>;
  template <size_t I, class T> class tuple_element<I, volatile T>;
  template <size_t I, class T> class tuple_element<I, const volatile T>;

  template <size_t I, class... Types>
  class tuple_element<I, tuple<Types...>> {
  public:
    typedef TI type;
  };

  template <size_t I, class T>
  using tuple_element_t = typename tuple_element<I, T>::type; // C++14
}
```
* tuple[link ./tuple.md]
* size_t[link /reference/cstddef/size_t.md]

##概要
`tuple_element`は、タプルとして見なせる型から、I番目の要素型を取得するためのクラスである。 
`tuple_element`の第1テンプレート引数に要素番号、第2引数のタプルの型を指定し、ネスト型である`type`型を取り出すことで要素型を得ることができる。

- `template <size_t I, class T> class tuple_element;`

特殊化のための先行宣言。特殊化されていない型の場合、定義が行われないため要素型を取得しようとする段階でコンパイルエラーとなる。

- `template <size_t I, class T> class tuple_element<I, const T>;`
- `template <size_t I, class T> class tuple_element<I, volatile T>;`
- `template <size_t I, class T> class tuple_element<I, const volatile T>;`

CV修飾された型からも要素型を取得できるようにするための部分特殊化。

- `template <size_t I, class... Types> class tuple_element<I, `[`tuple`](./tuple.md)`<Tuples...>>;`

`std::tuple`から要素型を取得できるようにするための部分特殊化。


##例
```cpp
#include <tuple>
#include <type_traits>

int main()
{
  static_assert(std::is_same<
                  std::tuple_element<0, std::tuple<int, char, double>>::type,
                  int
                >::value, "");

  static_assert(std::is_same<
                  std::tuple_element<1, std::tuple<int, char, double>>::type,
                  char
                >::value, "");

  static_assert(std::is_same<
                  std::tuple_element<2, std::tuple<int, char, double>>::type,
                  double
                >::value, "");

  // const修飾
  static_assert(std::is_same<
                  std::tuple_element<0, const std::tuple<int, char, double>>::type,
                  const int
                >::value, "");

  // volatile修飾
  static_assert(std::is_same<
                  std::tuple_element<0, volatile std::tuple<int, char, double>>::type,
                  volatile int
                >::value, "");

  // const, volatile修飾
  static_assert(std::is_same<
                  std::tuple_element<0, const volatile std::tuple<int, char, double>>::type,
                  const volatile int
                >::value, "");
}
```
* tuple_element[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N3887 Consistent Metafunction Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3887.pdf)

