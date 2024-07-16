# tuple_element
* tuple[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T>
  class tuple_element;                        // (1) C++11 宣言のみで定義なし

  template <std::size_t I, class T>
  class tuple_element<I, const T>;            // (2) C++11

  template <std::size_t I, class T>
  class tuple_element<I, volatile T>;         // (3) C++11
                                              // C++20で非推奨

  template <std::size_t I, class T>
  class tuple_element<I, const volatile T>;   // (4) C++11
                                              // C++20で非推奨

  template <std::size_t I, class... Types>
  class tuple_element<I, tuple<Types...>> {   // (5) C++11
  public:
    using type = TI;
  };

  template <std::size_t I, class T>
  using tuple_element_t =
    typename tuple_element<I, T>::type;       // (6) C++14
}
```
* tuple[link tuple.md]

## 概要
`tuple_element`は、タプルとして見なせる型から、I番目の要素型を取得するためのクラスである。

`tuple_element`の第1テンプレート引数に要素番号、第2引数のタプルの型を指定し、ネスト型である`type`型を取り出すことで要素型を得ることができる。

- (1) : 特殊化のための先行宣言。特殊化されていない型の場合、定義が行われないため要素型を取得しようとする段階でコンパイルエラーとなる
- (2) : `const`修飾された型からも要素型を取得できるようにするための部分特殊化
- (3) : `volatile`修飾された型からも要素型を取得できるようにするための部分特殊化
- (4) : `const volatile`修飾された型からも要素型を取得できるようにするための部分特殊化
- (5) : `std::tuple`から要素型を取得できるようにするための部分特殊化
- (6) : エイリアステンプレート版


## 非推奨の詳細
- (3), (4) : これらの部分特殊化は、型の`volatile`修飾を部分的に非推奨にすることにともなって、非推奨化される


## 例
```cpp example
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
}
```
* std::tuple_element[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [N3887 Consistent Metafunction Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3887.pdf)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
