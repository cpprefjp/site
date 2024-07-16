# lexicographical_compare
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]


```cpp
namespace std::ranges {
  template <input_iterator I1,
            sentinel_for<I1> S1,
            input_iterator I2,
            sentinel_for<I2> S2,
            class Proj1 = identity,
            class Proj2 = identity,
            indirect_strict_weak_order<
              projected<I1, Proj1>,
              projected<I2, Proj2>
            > Comp = ranges::less>
  constexpr bool
    lexicographical_compare(I1 first1,
                            S1 last1,
                            I2 first2,
                            S2 last2,
                            Comp comp = {},
                            Proj1 proj1 = {},
                            Proj2 proj2 = {}); // (1) C++20

  template <input_range R1,
            input_range R2,
            class Proj1 = identity,
            class Proj2 = identity,
            indirect_strict_weak_order<
              projected<iterator_t<R1>, Proj1>,
              projected<iterator_t<R2>, Proj2>
            > Comp = ranges::less>
  constexpr bool
    lexicographical_compare(R1&& r1,
                            R2&& r2,
                            Comp comp = {},
                            Proj1 proj1 = {},
                            Proj2 proj2 = {}); // (2) C++20
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* projected[link /reference/iterator/projected.md]
* ranges::less[link /reference/functional/ranges_less.md]
* identity[link /reference/functional/identity.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要
`[first1, last1)`および`[first2, last2)`の2つの範囲を辞書式順序で比較する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 効果
```cpp
for ( ; first1 != last1 && first2 != last2 ; ++first1, ++first2) {
  if (*first1 < *first2) return true;
  if (*first2 < *first1) return false;
}
return first1 == last1 && first2 != last2;
```


## 戻り値
範囲`[first1, last1)`が、辞書式比較で範囲`[first2, last2)`より小さい場合`true`を返し、そうでなければ`false`を返す。


## 計算量
高々`2*min((last1 - first1), (last2 - first2))`回の比較が行われる。


## 備考
空のシーケンスは、空でないシーケンスより小さいと判断されるが、空のシーケンスに対しては小さくないと判断される。

どちらかのシーケンスの横断が先に終わる場合(つまり、範囲の長さが合わない場合)、先に終わった方が小さいと判断される。


## 例
```cpp example
#include <iostream>
#include <string>
#include <algorithm>

template <class X, class Y>
void compare_test(const X& x, const Y& y)
{
  if (std::ranges::lexicographical_compare(x, y)) {
    std::cout << "x less than y" << std::endl;
  }
  else {
    std::cout << "x not less than y" << std::endl;
  }

  // 比較演算のカスタマイズバージョン
  if (std::ranges::lexicographical_compare(x, y, std::ranges::greater())) {
    std::cout << "x less than y" << std::endl;
  }
  else {
    std::cout << "x not less than y" << std::endl;
  }
}

int main()
{
  // 同じ長さの文字列比較
  {
    std::string x = "heilo";
    std::string y = "hello";

    std::cout << "same length string compare:" << std::endl;
    compare_test(x, y);
  }
  std::cout << std::endl;

  // 異なる長さの文字列比較
  {
    std::string x = "hell";
    std::string y = "hello";

    std::cout << "not same length string compare:" << std::endl;
    compare_test(x, y);
  }
}
```
* std::ranges::lexicographical_compare[color ff0000]
* std::ranges::greater[link /reference/functional/ranges_greater.md]

### 出力
```
same length string compare:
x less than y
x not less than y

not same length string compare:
x less than y
x less than y
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
