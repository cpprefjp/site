# partial_sum
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator
    partial_sum(InputIterator first,
                InputIterator last,
                OutputIterator result);    // (1) C++03
  template <class InputIterator, class OutputIterator>
  constexpr OutputIterator
    partial_sum(InputIterator first,
                InputIterator last,
                OutputIterator result);    // (1) C++20

  template <class InputIterator, class OutputIterator, class BinaryOperation>
  OutputIterator
    partial_sum(InputIterator first,
               InputIterator last,
               OutputIterator result,
               BinaryOperation binary_op); // (2) C++03
  template <class InputIterator, class OutputIterator, class BinaryOperation>
  constexpr OutputIterator
    partial_sum(InputIterator first,
               InputIterator last,
               OutputIterator result,
               BinaryOperation binary_op); // (2) C++20
}
```

## 概要
範囲の値の部分和を計算する。

[`accumulate()`](accumulate.md)は最終結果のみを得るが、`partial_sum()`は計算の途�結果のシーケンスを得る。

`partial_sum()`の引数としてシーケンス`{0, 1, 2, 3}`が与えられた場合、以下のような計算が行われる：

```cpp
// 計算の経過
{
  0,            // (1)
  0 + 1,        // (2)
  0 + 1 + 2,    // (3)
  0 + 1 + 2 + 3 // (4)
}
```

そして最終的に、以下のシーケンスが結果として出力される：

```cpp
{0, 1, 3, 6}
```

出力イテレータ`result`には、そのシーケンスが書き込まれる。

2項演算の関数オブジェクト`binary_op`には、第1引数として現在の集積値が渡され(「計算の経過」の(3)では、`0 + 1`した結果の`1`が渡される)、第2引数として新たに集積する値が渡される(「計算の経過」の(3)では、`2`が渡される)。

- (1) : 値を集積する方法として、`binary_op`をデフォルトで`operator+`とする
- (2) : 値を集積する方法を`binary_op`として、任意にユーザーが決定する


## 要件
- C++03まで : `binary_op`を呼び出した結果として、いかなる副作用も起こしてはならない
- C++11から : `InputIterator`の値型は、`*first`の型から構築可能でなければならない
- C++11から : `binary_op`の戻り値が、`InputIterator`の値型に変換可能でなければならない
- C++11から : `binary_op`の戻り値が、`result`出力イテレータに書き込めなければならない
- C++11から : `binary_op`は入力範囲`[first, last]`および出力範囲`[result, result + (last - first)]`の要素を変更してはならず、そのイテレータと部分範囲を無効化してはならない


## 効果
- (1) : `binary_op`を`operator+`として、(2)の演算を行う
- (2) : 出力結果の範囲`[result, result + (last - first))`には、以下が書き込まれる：
    - C++03 :

    ```
    *firstが書き込まれる                             // (1)
    binary_op(*first, *(first + 1))が書き込まれる    // (2)
    binary_op((2)の結果, *(first + 2))が書き込まれる // (3)
    binary_op((3)の結果, *(first + 3))が書き込まれる // (4)
    …
    binary_op((N-2)の結果, *(first + (N-1)))が書き込まれる
    ```

    - C++20 :

    ```
    *firstが書き込まれる                                        // (1)
    binary_op(std::move(*first), *(first + 1))が書き込まれる    // (2)
    binary_op(std::move((2)の結果), *(first + 2))が書き込まれる // (3)
    binary_op(std::move((3)の結果), *(first + 3))が書き込まれる // (4)
    …
    binary_op(std::move((N-2)の結果), *(first + (N-1)))が書き込まれる
    ```
    * std::move[link /reference/utility/move.md]


## 戻り値
`result + (last - first)`


## 計算量
ちょうど`(last - first) - 1`回だけ`binary_op`を適用する


## 備考
この関数は、他の言語では`scan`という名前で提供されている。


## 例
```cpp example
#include <numeric>
#include <iostream>
#include <array>

template <class Range>
void print(const Range& r)
{
  for (const auto& x : r) {
    std::cout << x << " --> ";
  }
  std::cout << "end" << std::endl;
}

int main()
{
  const std::array<double, 5> ar = {.0,.2,.4,.6,.8};

  {
    std::array<double, 5> result;
    std::partial_sum(ar.begin(), ar.end(), result.begin());
    print(result);
  }

  {
    std::array<double, 5> result;
    std::partial_sum(ar.begin(), ar.end(), result.begin(),
                       [](double a, double b) { return 2 * a - b; });
    print(result);
  }
}
```
* std::partial_sum[color ff0000]
* ar.begin()[link /reference/array/array/begin.md]
* ar.end()[link /reference/array/array/end.md]
* result.begin()[link /reference/array/array/begin.md]

### 出力
```
0 --> 0.2 --> 0.6 --> 1.2 --> 2 --> end
0 --> -0.2 --> -0.8 --> -2.2 --> -5.2 --> end
```


## 参照
- [P0616R0 De-pessimize legacy `<numeric>` algorithms with `std::move`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0616r0.pdf)
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
