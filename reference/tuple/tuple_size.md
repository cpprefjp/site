# tuple_size
* tuple[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  class tuple_size;                   // (1) C++11 宣言のみで定義なし

  template <class T>
  class tuple_size<const T>;          // (2) C++11

  template <class T>
  class tuple_size<volatile T>;       // (3) C++11
                                      // C++20で非推奨

  template <class T>
  class tuple_size<const volatile T>; // (4) C++11
                                      // C++20で非推奨

  template <class... Types>
  class tuple_size<tuple<Types...>>
    : public integral_constant<size_t, sizeof...(Types)> {}; // (5) C++11

  template <class T>
  inline constexpr size_t tuple_size_v =
    tuple_size<T>::value;                                    // (6) C++17
}
```
* tuple[link tuple.md]
* integral_constant[link /reference/type_traits/integral_constant.md]

## 概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。

要素数は、[`integral_constant`](/reference/type_traits/integral_constant.md)の機能を利用してコンパイル時の定数値として取得できる。

- (1) : 特殊化のための先行宣言。特殊化されていない型の場合、定義が行われないため要素数を取得しようとする段階でコンパイルエラーとなる
- (2) : `const`修飾された型からも要素数を取得できるようにするための部分特殊化
- (3) : `volatile`修飾された型からも要素数を取得できるようにするための部分特殊化
- (4) : `const volatile`修飾された型からも要素数を取得できるようにするための部分特殊化
- (5) : `std::tuple`の要素数を取得できるようにするための部分特殊化
- (6) : 変数テンプレート版


型`T`がタプルと見なせない型であった場合、

- C++11 : 仕様で明確に規定されてはいないが、直接的にコンパイルエラーとなる
- C++17 : メンバ`value`が定義されない (SFINAEと組み合わせて扱える)


## 非推奨の詳細
- (3), (4) : これらの部分特殊化は、型の`volatile`修飾を部分的に非推奨にすることにともなって、非推奨化される


## 例

```cpp example
#include <tuple>

int main()
{
  static_assert(std::tuple_size<      std::tuple<int, int, int>>::value == 3, "");
  static_assert(std::tuple_size<const std::tuple<int, int, int>>::value == 3, "");
}
```
* std::tuple_size[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [LWG Issue 2770. `tuple_size<const T>` specialization is not SFINAE compatible and breaks decomposition declarations](https://wg21.cmeerw.net/lwg/issue2770)
    - C++17で[構造化束縛](/lang/cpp17/structured_bindings.md)機能が導入されたことに合わせて、`tuple_size`がSFINAEと組み合わせて使用できるようになった
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
