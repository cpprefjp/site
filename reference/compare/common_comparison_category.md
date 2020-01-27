# common_comparison_category

* compare[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {

  template<class... Ts>
  struct common_comparison_category {
    using type = …;
  };

  template<class... Ts>
  using common_comparison_category_t = typename common_comparison_category<Ts...>::type;
}
```

## 概要

与えられた全ての型から変換可能な共通比較カテゴリ型（*common comparison category type*）を求める。


## 効果

`Ts...`の共通比較カテゴリ型となる型をメンバ型`type`として定義する。


`Ts...`内のそれぞれの型を`Ti (0 <= i < N)`として、共通比較カテゴリ型`U`は以下のように決定される。

1. `Ti`の�に一つでも比較カテゴリ型でない型がある場合、`U = void`
2. `Ti`の�に1つでも`partial_ordering`がある場合、`U = partial_ordering`
3. `Ti`の�に1つでも`weak_ordering`がある場合、`U = weak_ordering`
4. それ以外の場合、`U = strong_ordering`（`N == 0`の場合）

## 備考

`Ts...`が空であったり、比較カテゴリ型でない型が含まれていたとしてもメンバ型`type`は定義される。それぞれ、`strong_ordering`と`void`になる。

## 例

```cpp example
#include <iostream>
#include <compare>
#include <type_traits>

template<typename T, typename Cat>
using fallback_comp3way = std::conditional_t<std::three_way_comparable<T>, std::compare_three_way_result_t<T>, Cat>;

using category = std::weak_ordering;

template<typename T1, typename T2, typename T3>
struct triple {
  T1 t1;
  T2 t2;
  T3 t3;

  //<=>を使用可能ならそれを、そうでないなら< ==を使ってdefault実装
  auto operator<=>(const triple&) const
    -> std::common_comparison_category_t<fallback_comp3way<T1, category>, fallback_comp3way<T2, category>, fallback_comp3way<T3, category>>
      = default;
}

struct no_spaceship {
  int n;

  bool operator<(const no_spaceship& that) const noexcept {
    return n < that.n;
  }

  bool operator==(const no_spaceship& that) const noexcept {
    return n == that.n;
  }
};

int main()
{
  triple<int, double, no_spaceship> t1 = {10, 3.14, {20}}, t2 = {10, 3.14, {30}};

  std::cout << std::boolalpha;
  std::cout << (t1 <  t2) << std::endl;
  std::cout << (t1 <= t2) << std::endl;
  std::cout << (t1 >  t2) << std::endl;
  std::cout << (t1 >= t2) << std::endl;
}
```
* common_comparison_category_t[color ff0000]

### 出力
```
true
true
false
false
```

このコードをコンパイルできるコンパイラがまだないため、結果は予想。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
