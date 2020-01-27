# lexicographical_compare_three_way
* algorithm[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class InputIterator1, class InputIterator2, class Cmp>
    constexpr auto
      lexicographical_compare_three_way(InputIterator1 first1, InputIterator1 last1,
                                        InputIterator2 first2, InputIterator2 last2,
                                        Cmp comp)
        -> common_comparison_category_t<decltype(comp(*first1, *first2)), strong_ordering>; // (1)

  template<class InputIterator1, class InputIterator2>
    constexpr auto
      lexicographical_compare_three_way(InputIterator1 first1, InputIterator1 last1,
                                        InputIterator2 first2, InputIterator2 last2);       // (2)
}
```
* common_comparison_category_t[link /reference/compare/common_comparison_category.md]
* strong_ordering[link /reference/compare/strong_ordering.md]


## 概要

`[first1, last1)`および`[first2, last2)`の2つの範囲を[辞書式順序](lexicographical_compare.md)による三方比較によって比較する。
このアルゴリズムは、コンテナの`operator<=>()`の実装で使用される。


## 適格要件

- (1) : `decltype(comp(*first1, *first2))`の型は[比較カテゴリ型](/reference/compare.md)のうちの1つであること。

## 引数

- `first1` -- 比較する1つ目の範囲の先�のイテレータ。
- `last1` -- 比較する1つ目の範囲の終端のイテレータ。
- `first2` -- 比較する2つ目の範囲の先�のイテレータ。
- `last2` -- 比較する2つ目の範囲の終端のイテレータ。
- `comp` -- 使用する三方比較をカスタマイズする関数オブジェクト。

## 効果

- (1) : 以下と�価
  ```cpp
  for ( ; first1 != last1 && first2 != last2; void(++first1), void(++first2) )
    if (auto cmp = comp(*first1, *first2); cmp != 0)
      return cmp;
  return first1 != last1 ? strong_ordering::greater :
         first2 != last2 ? strong_ordering::less :
                           strong_ordering::equal;
  ```
  * strong_ordering[link /reference/compare/strong_ordering.md]

- (2) : 以下と�価、すなわち(1)に移�
  ```cpp
  return lexicographical_compare_three_way(first1, last1, first2, last2, compare_three_way());
  ```
  * compare_three_way[link /reference/compare/compare_three_way.md]


## 戻り値

戻り値型となる比較カテゴリ型を`Cat`とすると、  
範囲`[first1, last1)`が、辞書式比較で範囲`[first2, last2)`より大きい場合は`Cat::greator`を返し、小さい場合`Cat::less`を返し、�しいのならば`Cat::equivalent`を返す。

## 例
```cpp example
#include <iostream>
#include <compare>
#include <algorithm>
#include <cctype>

//大文�小文�を同値として扱って比較
auto weak_comp = [](char cl, char cr) -> std::weak_ordering {
  char c1, c2;
  if (std::isalpha(static_cast<unsigned char>(cl)) && std::isalpha(static_cast<unsigned char>(cr))) {
    c1 = std::tolower(cl);
    c2 = std::tolower(cr);
  } else {
    c1 = cl;
    c2 = cr;
  }
  return c1 <=> c2;
};

int main() {
  std::string str1 = "abcdefghijklmnopqrstuvwxyz";
  std::string str2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  std::string str3 = "abcdefghijklm";

  std::cout << std::boolalpha;

  //カスタマイズした比較による同じ長さの範囲の比較
  {
    auto comp = std::lexicographical_compare_three_way(str1.begin(), str1.end(), str2.begin(), str2.end(), weak_comp);
    std::cout << (comp == 0) << std::endl;
  }

  //デフォルトの比較による異なる長さの範囲の比較
  {
    auto comp = std::lexicographical_compare_three_way(str1.begin(), str1.end(), str3.begin(), str3.end());
    std::cout << (comp > 0) << std::endl;
  }
}
```
  * weak_ordering[link /reference/compare/weak_ordering.md]

### 出力例
```
true
true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)
- [lexicographical_compare()](lexicographical_compare.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
