# lexicographical_compare_three_way
* algorithm[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class InputIterator1, class InputIterator2, class Cmp>
    constexpr auto
      lexicographical_compare_three_way(
        InputIterator1 first1,
        InputIterator1 last1,
        InputIterator2 first2,
        InputIterator2 last2,
        Cmp comp)
        -> decltype(comp(*first1, *first2)); // (1)

  template<class InputIterator1, class InputIterator2>
    constexpr auto
      lexicographical_compare_three_way(
        InputIterator1 first1,
        InputIterator1 last1,
        InputIterator2 first2,
        InputIterator2 last2);               // (2)
}
```


## 概要

2つのイテレータ範囲`[first1, last1)`と`[first2, last2)`を[辞書式順序](lexicographical_compare.md)による三方比較によって比較する。

このアルゴリズムは、コンテナの`operator<=>()`の実装で使用される。


## 適格要件

- (1) : `decltype(comp(*first1, *first2))`の型は[比較カテゴリ型](/reference/compare.md)のうちの1つであること。

## 引数

- `first1` -- 比較する1つ目のイテレータ範囲の先頭イテレータ。
- `last1` -- 比較する1つ目のイテレータ範囲の終端イテレータ。
- `first2` -- 比較する2つ目のイテレータ範囲の先頭イテレータ。
- `last2` -- 比較する2つ目のイテレータ範囲の終端イテレータ。
- `comp` -- 使用する三方比較をカスタマイズする関数オブジェクト。

## 効果

まず、`N`をmin`(last1 - first1, last2 - first2)`、`E(n)`を`comp(*(first1 + n), *(first2 + n))`で定義する。

- (1) : 次のいずれか
    - `E(i) != 0`が`true`となる`[0, N)`内の最小の整数`i`について、`E(i)`
        - `comp`の意味で異なる最初の要素についての三方比較の結果を返す
    - そのような`i`が存在しない場合 : `(last1 - first1) <=> (last2 - first2)`
        - 全ての要素が等しいならば、長さを比較する

- (2) : 以下と等価、すなわち(1)に委譲
    ```cpp
    return lexicographical_compare_three_way(first1, last1, first2, last2, compare_three_way());
    ```
    * compare_three_way[link /reference/compare/compare_three_way.md]


## 戻り値

戻り値型となる比較カテゴリ型を`Cat`とすると、  
イテレータ範囲`[first1, last1)`が、辞書式比較でイテレータ範囲`[first2, last2)`より大きい場合は`Cat::greater`を返し、小さい場合`Cat::less`を返し、等しいのならば`Cat::equivalent`を返す。

## 計算量

「効果」節の`N`について

高々`N`回の`comp`による比較が行われる。

## 例
```cpp example
#include <iostream>
#include <compare>
#include <algorithm>
#include <cctype>

//大文字小文字を同値として扱って比較
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

  //カスタマイズした比較による同じ長さのイテレータ範囲の比較
  {
    auto comp = std::lexicographical_compare_three_way(str1.begin(), str1.end(), str2.begin(), str2.end(), weak_comp);
    std::cout << (comp == 0) << std::endl;
  }

  //デフォルトの比較による異なる長さのイテレータ範囲の比較
  {
    auto comp = std::lexicographical_compare_three_way(str1.begin(), str1.end(), str3.begin(), str3.end());
    std::cout << (comp > 0) << std::endl;
  }
}
```
* std::lexicographical_compare_three_way[color ff0000]
* std::string[link /reference/string/string.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]
* std::isalpha[link /reference/cctype/isalpha.md]
* std::tolower[link /reference/cctype/tolower.md]
* weak_ordering[link /reference/compare/weak_ordering.md]
* str1.begin[link /reference/string/string/begin.md]
* str1.end[link /reference/string/string/end.md]
* str2.begin[link /reference/string/string/begin.md]
* str2.end[link /reference/string/string/end.md]
* str3.begin[link /reference/string/string/begin.md]
* str3.end[link /reference/string/string/end.md]

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
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)
- [`lexicographical_compare()`](lexicographical_compare.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding `<=>` to the Library)](http://wg21.link/p1614)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
- [LWG Issue 3410. lexicographical_compare_three_way is overspecified](https://cplusplus.github.io/LWG/issue3410)
