# adjacent_difference
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator
    adjacent_difference(InputIterator first,
                        InputIterator last,
                        OutputIterator result);     // (1) C++03
  template <class InputIterator, class OutputIterator>
  constexpr OutputIterator
    adjacent_difference(InputIterator first,
                        InputIterator last,
                        OutputIterator result);     // (1) C++20

  template <class InputIterator, class OutputIterator, class BinaryOperation>
  OutputIterator
    adjacent_difference(InputIterator first,
                        InputIterator last,
                        OutputIterator result,
                        BinaryOperation binary_op); // (2) C++03
  template <class InputIterator, class OutputIterator, class BinaryOperation>
  constexpr OutputIterator
    adjacent_difference(InputIterator first,
                        InputIterator last,
                        OutputIterator result,
                        BinaryOperation binary_op); // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  ForwardIterator2
    adjacent_difference(ExecutionPolicy&& exec,
                        ForwardIterator1 first,
                        ForwardIterator1 last,
                        ForwardIterator2 result);   // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class BinaryOperation>
  ForwardIterator2
    adjacent_difference(ExecutionPolicy&& exec,
                        ForwardIterator1 first,
                        ForwardIterator1 last,
                        ForwardIterator2 result,
                        BinaryOperation binary_op); // (4) C++17
}
```

## 概要
隣接する要素間の差を計算する。

この関数に与えられたイテレータ範囲`[first, last)`を`r`として、その範囲の隣接する要素同士の差を、`{r[0], r[1] - r[0], r[2] - r[1], r[3] - r[2], r[4] - r[3]}`のように演算して求められた新たな範囲を返す。

- (1), (3) : 各隣接要素`a`と`b`を`operator-(b, a)`で減算した結果を、`result`出力イテレータに書き込む
- (2), (4) : 各隣接要素`a`と`b`を`binary_op(b, a)`で減算した結果を、`result`出力イテレータに書き込む


## 要件
- (2) :
    - C++03まで : 関数オブジェクト`binary_op`の呼び出しは、副作用を起こしてはならない
    - C++11から : 関数オブジェクト`binary_op`の呼び出しが、イテレータ範囲`[first, last]`およびイテレータ範囲`[result, result + (last - first)]`の要素変更、イテレータの無効化をしてはならない
- (3), (4) :
    - イテレータ範囲`[first, last)`とイテレータ範囲`[result, result + (last - first))`は重なってはならない


## テンプレートパラメータ制約
- (1) :
    - C++11から : `InputIterator`が指す値の型が、[ムーブ代入可能](/reference/type_traits/is_move_assignable.md)であり、`*first`で初期化でき、`result`出力イテレータに書き込めること
    - C++11からC++17まで : `InputIterator`が指す値の型のオブジェクト`a`と`b`において、式`b - a`の結果が`result`出力イテレータに書き込めること
    - C++20から : `InputIterator`が指す値の型のオブジェクト`a`と`b`において、式`b -` [`std::move`](/reference/utility/move.md)`(a)`の結果が`result`出力イテレータに書き込めること
- (2) 
    - C++11から : `InputIterator`が指す値の型が、[ムーブ代入可能](/reference/type_traits/is_move_assignable.md)であり、`*first`で初期化でき、`result`出力イテレータに書き込めること
    - C++11からC++17まで : `InputIterator`が指す値の型のオブジェクト`a`と`b`において、式`binary_op(b, a)`の結果が`result`出力イテレータに書き込めること
    - C++20から : `InputIterator`が指す値の型のオブジェクト`a`と`b`において、式`binary_op(b,` [`std::move`](/reference/utility/move.md)`(a))`の結果が`result`出力イテレータに書き込めること
- (3) :
    - `ForwardIterator1`が指す値の型が、[ムーブ代入可能](/reference/type_traits/is_move_assignable.md)であり、`*first`で初期化でき、`ForwardIterator2`が指す値の型に対して代入できること
    - `ForwardIterator1`が指す値の型のオブジェクト`a`と`b`において、式`b - a`の結果が、`ForwardIterator2`が指す値の型に対して代入できること
- (4) :
    - `ForwardIterator1`が指す値の型が、[ムーブ代入可能](/reference/type_traits/is_move_assignable.md)であり、`*first`で初期化でき、`ForwardIterator2`が指す値の型に対して代入できること
    - `ForwardIterator1`が指す値の型のオブジェクト`a`と`b`において、式`binary_op(b, a)`の結果が、`ForwardIterator2`が指す値の型に対して代入できること


## 効果
- (1), (2) : 非空のイテレータ範囲`[first, last)`について、
    1. `*result = *first`で結果の初期値を書き込む。`acc = *first`としてひとつ前の位置の値を保持する
    2. イテレータ範囲`[first + 1, last)`の各イテレータを`i`、そのイテレータが指す値を`val`として定義する
    3.
        - C++17 : (1)であれば`val - acc`、(2)であれば`binary_op(val, acc)`で隣接値を求めて、その結果を`*result`に代入する
        - C++20 : (1)であれば`val -` [`std::move`](/reference/utility/move.md)`(acc)`、(2)であれば`binary_op(val,` [`std::move`](/reference/utility/move.md)`d(acc))`で隣接値を求めて、その結果を`*result`に代入する
    4. `val`を`acc`にムーブ代入し、ひとつ前の位置の値を更新する
- (3), (4) : 非空のイテレータ範囲`[first, last)`について、
    1. `*result = *first`で結果の初期値を代入する
    2. インデックス範囲`[1, last - first - 1]`のそれぞれの値`d`として定義する
    3. (3)であれば`val = *(first + d) - *(first + d - 1)`、(4)であれば`val = binary_op(*(first + d), *(first + d - 1))`として、隣接値を求める
    4. `*(result + d) = val`で各隣接値を出力する


## 戻り値
```cpp
result + (last - first)
```


## 計算量
ちょうど`(last - first) - 1`回の2項演算を適用する


## 備考
- (1), (2) : `result`は`first`と同値になるだろう


## 例
```cpp example
#include <iostream>
#include <numeric>
#include <vector>

template <class Range>
void print(const Range& r)
{
  for(const auto& x : r)
    std::cout << x << " --> ";
  std::cout << "end" << std::endl;
}

int main()
{
  std::vector<double> v = {0.0, 0.2, 0.4, 0.6, 0.8};
  std::vector<double> diffs(v.size());

  // (1) : operator-()を使用して、隣接要素の差を計算する
  std::adjacent_difference(v.cbegin(), v.cend(), diffs.begin());
  print(diffs);

  // (2) : 最後の引数として与えた任意の2項演算関数によって、
  //       隣接要素の差を計算する
  std::adjacent_difference(v.cbegin(), v.cend(), diffs.begin(),
    [](double a, double b) {
      return a*a - b*b; // 2点間の距離の計算
    });
  print(diffs);
}
```
* std::adjacent_difference[color ff0000]
* diffs.begin()[link /reference/vector/vector/begin.md]

### 出力
```
0 --> 0.2 --> 0.2 --> 0.2 --> 0.2 --> end
0 --> 0.04 --> 0.12 --> 0.2 --> 0.28 --> end
```


## 実装例
```cpp
#include <iterator>
#include <functional>

// (2)
template <class InputIterator, class OutputIterator, class BinaryOperation>
OutputIterator adjacent_difference(InputIterator first,
                                   InputIterator last,
                                   OutputIterator result,
                                   BinaryOperation binary_op)
{
  if (first == last)
    return result;

  using value_type = typename std::iterator_traits<InputIterator>::value_type;

  value_type acc = *first;
  *result = acc;
  ++result;
  ++first;

  while (first != last) {
    value_type val = *first;
    *result = binary_op(val, std::move(acc));
    acc = std::move(val);

    ++result;
    ++first;
  }
  return result;
}

// (1)
template <class InputIterator, class OutputIterator>
OutputIterator adjacent_difference(InputIterator first, InputIterator last, OutputIterator result)
{
  using value_type = typename std::iterator_traits<InputIterator>::value_type;
  return adjacent_difference(first, last, result, std::minus<value_type>());
}
```
* std::iterator_traits[link /reference/iterator/iterator_traits.md]
* std::move[link /reference/utility/move.md]
* std::minus[link /reference/functional/minus.md]


## 参照
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P0623R0 Final C++17 Parallel Algorithms Fixes](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0623r0.html)
- [P0616R0 De-pessimize legacy `<numeric>` algorithms with `std::move`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0616r0.pdf)
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
