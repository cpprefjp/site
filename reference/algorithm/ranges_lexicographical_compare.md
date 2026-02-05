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

  template <execution-policy Ep,
            random_access_iterator I1,
            sized_sentinel_for<I1> S1,
            random_access_iterator I2,
            sized_sentinel_for<I2> S2,
            class Proj1 = identity,
            class Proj2 = identity,
            indirect_strict_weak_order<
              projected<I1, Proj1>,
              projected<I2, Proj2>
            > Comp = ranges::less>
  bool lexicographical_compare(Ep&& exec,
                               I1 first1,
                               S1 last1,
                               I2 first2,
                               S2 last2,
                               Comp comp = {},
                               Proj1 proj1 = {},
                               Proj2 proj2 = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R1,
            sized-random-access-range R2,
            class Proj1 = identity,
            class Proj2 = identity,
            indirect_strict_weak_order<
              projected<iterator_t<R1>, Proj1>,
              projected<iterator_t<R2>, Proj2>
            > Comp = ranges::less>
  bool lexicographical_compare(Ep&& exec,
                               R1&& r1,
                               R2&& r2,
                               Comp comp = {},
                               Proj1 proj1 = {},
                               Proj2 proj2 = {}); // (4) C++26
}
```
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* ranges::less[link /reference/functional/ranges_less.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
`[first1, last1)`および`[first2, last2)`の2つの範囲を辞書式順序で比較する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

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
### 基本的な使い方
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

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> a = {1, 2, 3, 4, 5};
  std::vector<int> b = {1, 2, 3, 4, 6};

  // 並列に辞書式比較を行う
  bool result = std::ranges::lexicographical_compare(
    std::execution::par,
    a,
    b
  );

  std::cout << std::boolalpha;
  std::cout << "a < b: " << result << std::endl;
}
```
* std::ranges::lexicographical_compare[color ff0000]

#### 出力
```
a < b: true
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
