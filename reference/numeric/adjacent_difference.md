#adjacent_difference
* numeric[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
    OutputIterator adjacent_difference(
      InputIterator first, InputIterator last,
      OutputIterator result);      // (1)

  template <class InputIterator, class OutputIterator, class BinaryOperation>
    OutputIterator adjacent_difference(
      InputIterator first, InputIterator last,
      OutputIterator result,
      BinaryOperation binary_op);  // (2)
}
```

##概要
隣接する要素間の差を計算する。

この関数に与えられた範囲`[first, last)`を`r`として、その範囲の隣接する要素同士の差を、`{r[0], r[0] - r[1], r[1] - r[2], r[2] - r[3], r[3] - r[4]}`のように演算して求められた新たな範囲を返す。

- (1) : 各隣接要素`a`と`b`を`operator-(a, b)`で減算した結果を、`result`出力イテレータに書き込む
- (2) : 各隣接要素`a`と`b`を`binary_op(a, b)`で減算した結果を、`result`出力イテレータに書き込む


##要件
- C++03まで : `binary_op`は副作用を起こしてはならない
- C++11から : `InputIterator`が指す値の型が、[MoveAssignable](/reference/concepts/MoveAssignable.md)であり、`*first`で初期化でき、`result`出力イテレータに書き込めること
- C++11から (1) : `InputIterator`が指す値の型のオブジェクト`a`と`b`において、式`a - b`の結果が`result`出力イテレータに書き込めること
- C++11から (2) : `InputIterator`が指す値の型のオブジェクト`a`と`b`において、式`binary_op(a, b)`の結果が`result`出力イテレータに書き込めること
- C++11から (2) : `binary_op`の呼び出しが、範囲`[first, last]`および範囲`[result, result + (last - first)]`の要素変更、イテレータの無効化をしてはならない


##効果
非空の範囲`[first, last)`について、

1. `*result = *first`で結果の初期値を書き込む
2. 範囲`[first + 1, last)`の各イテレータを`i`、そのイテレータが指す値を`val`として定義する
3. (1)であれば`val - acc`、(2)であれば`binary_op(val, acc)`の結果を`*result`に代入する
4. `val`を`acc`にムーブ代入する


##戻り値
```cpp
result + (last - first)
```


##計算量
ちょうど`(last - first) - 1`回の2項演算を適用する


##例
```cpp
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

###出力
```
0 --> 0.2 --> 0.2 --> 0.2 --> 0.2 --> end
0 --> 0.04 --> 0.12 --> 0.2 --> 0.28 --> end
```


##実装例
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

  typedef
    typename std::iterator_traits<InputIterator>::value_type
  value_type;

  value_type acc = *first;
  *result = acc;
  ++result;
  ++first;

  while (first != last) {
    value_type val = *first;
    *result = binary_op(val, acc);
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
  typedef
    typename std::iterator_traits<InputIterator>::value_type
  value_type;

  return adjacent_difference(first, last, result, std::minus<value_type>());
}
```
* std::iterator_traits[link /reference/iterator/iterator_traits.md]
* std::move[link /reference/utility/move.md]
* std::minus[link /reference/functional/minus.md]

