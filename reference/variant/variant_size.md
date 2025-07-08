# variant_size
* variant[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  struct variant_size;                   // (1) C++17 先行宣言

  template <class T>
  struct variant_size<const T>;          // (2) C++17

  template <class T>
  struct variant_size<volatile T>;       // (3) C++17
                                         // C++20で非推奨

  template <class T>
  struct variant_size<const volatile T>; // (4) C++17
                                         // C++20で非推奨

  template <class T>
  inline constexpr size_t variant_size_v
    = variant_size<T>::value;            // (5) C++17

  template<class... Types>
  struct variant_size<variant<Types...>>
    : integral_constant<std::size_t, sizeof...(Types)> {}; // (6) C++17
}
```
* variant[link variant.md]
* integral_constant[link /reference/type_traits/integral_constant.md]

## 概要
`variant_size`は、[`std::variant`](variant.md)クラスの候補型の数を取得するためのクラスである。


要素数は、[`integral_constant`](/reference/type_traits/integral_constant.md)の機能を利用してコンパイル時の定数値として取得できる。

- (1) : 先行宣言
- (2) : `const`修飾付きの[`std::variant`](variant.md)型の、候補型の数を取得する
- (3) : `volatile`修飾付きの[`std::variant`](variant.md)型の、候補型の数を取得する
- (4) : `const volatile`修飾付きの[`std::variant`](variant.md)型の、候補型の数を取得する
- (5) : 変数テンプレート版
- (6) : 修飾なしの[`std::variant`](variant.md)型の、候補型の数を取得する


## 非推奨の詳細
- (3), (4) : これらの部分特殊化は、型の`volatile`修飾を部分的に非推奨にすることにともなって、非推奨化される


## 例
```cpp example
#include <variant>
#include <string>

int main()
{
  // (6) CV修飾なしのstd::variant型の、候補型 (int, std::string, double) の数を取得する
  static_assert(std::variant_size<
    std::variant<int, std::string, double>
  >::value == 3);

  // (2) const修飾付きのstd::variant型の、候補型の数を取得する
  static_assert(std::variant_size<
    const std::variant<int, std::string, double>
  >::value == 3);

  // (5) 変数テンプレート版
  static_assert(std::variant_size_v<
    std::variant<int, std::string, double>
  > == 3);
}
```
* std::variant_size[color ff0000]
* std::variant_size_v[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
