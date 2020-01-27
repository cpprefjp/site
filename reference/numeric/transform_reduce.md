# transform_reduce
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std{
  template <class InputIterator1, class InputIterator2, class T>
  T transform_reduce(InputIterator1 first1,
                     InputIterator1 last1,
                     InputIterator2 first2,
                     T init);                      // (1) C++17
  template <class InputIterator1, class InputIterator2, class T>
  constexpr T
    transform_reduce(InputIterator1 first1,
                     InputIterator1 last1,
                     InputIterator2 first2,
                     T init);                      // (1) C++20

  template <class InputIterator1, class InputIterator2, class T,
            class BinaryOperation1, class BinaryOperation2>
  T transform_reduce(InputIterator1 first1,
                     InputIterator1 last1,
                     InputIterator2 first2,
                     T init,
                     BinaryOperation1 binary_op1,
                     BinaryOperation2 binary_op2); // (2) C++17
  template <class InputIterator1, class InputIterator2, class T,
            class BinaryOperation1, class BinaryOperation2>
  constexpr T
    transform_reduce(InputIterator1 first1,
                     InputIterator1 last1,
                     InputIterator2 first2,
                     T init,
                     BinaryOperation1 binary_op1,
                     BinaryOperation2 binary_op2); // (2) C++20

  template <class InputIterator, class T,
            class BinaryOperation, class UnaryOperation>
  T transform_reduce(InputIterator first,
                     InputIterator last,
                     T init,
                     BinaryOperation binary_op,
                     UnaryOperation unary_op);     // (3) C++17
  template <class InputIterator, class T,
            class BinaryOperation, class UnaryOperation>
  constexpr T
    transform_reduce(InputIterator first,
                     InputIterator last,
                     T init,
                     BinaryOperation binary_op,
                     UnaryOperation unary_op);     // (3) C++20

  template <class ExecutionPolicy,
            class ForwardIterator1, class ForwardIterator2, class T>
  T transform_reduce(ExecutionPolicy&& exec,
                     ForwardIterator1 first1,
                     ForwardIterator1 last1,
                     ForwardIterator2 first2,
                     T init);                      // (4) C++17

  template <class ExecutionPolicy,
            class ForwardIterator1, class ForwardIterator2, class T,
            class BinaryOperation1, class BinaryOperation2>
  T transform_reduce(ExecutionPolicy&& exec,
                     ForwardIterator1 first1,
                     ForwardIterator1 last1,
                     ForwardIterator2 first2,
                     T init,
                     BinaryOperation1 binary_op1,
                     BinaryOperation2 binary_op2); // (5) C++17

  template <class ExecutionPolicy,
            class ForwardIterator, class T,
            class BinaryOperation, class UnaryOperation>
  T transform_reduce(ExecutionPolicy&& exec,
                     ForwardIterator first,
                     ForwardIterator last,
                     T init,
                     BinaryOperation binary_op,
                     UnaryOperation unary_op);     // (6) C++17
}
```

## 概要
`transform_reduce()`は、範囲の要素を変換しながら集計する関数である。

(1)、(2)、(4)、(5)は、範囲`[first1, last1)`の各要素を`x`、範囲`[first2, first2+(last1 - first1))`の各要素を`y`として、初期値(`init`)と`binary_op2(x, y)`した各要素を合算したリストの任意の組み合わせに、順不同で`binary_op1(binary_op1(a, b), binary_op1(c, d))`のように適用していき、集計値を計算する。

(3)と(6)は、初期値(`init`)と、範囲`[first, last)`の各要素に関数オブジェクト`unary_op`を適用して合算したリストの任意の組み合わせに、順不同で`binary_op(binary_op(a, b), binary_op(c, d))`のように適用していき、集計値を計算する。

- (1) : リスト集計の二項演算に`operator+`を使用し、2つの範囲の要素を掛け合わせる二項演算に`operator*`を使用する
- (2) : リスト集計の二項演算に`binary_op1`を使用し、2つの範囲の要素を掛け合わせる二項演算に`binary_op2`を使用する
- (3) : リスト集計の二項演算に`operator+`を使用し、各要素の変換に`unary_op`を使用する
- (4) : (1)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (5) : (2)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (6) : (3)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる


## 要件
- (1), (2), (4), (5) : 関数オブジェクト`binary_op1`と`binary_op2`の呼び出しは、範囲`[first1, last1]`と`[first2, first2 + (last1 - first1)]`の要素変更およびイテレータの無効化をしてはならない
- (3), (6) : 関数オブジェクト`unary_op`と`binary_op`の呼び出しは、範囲`[first, last]`の要素変更およびイテレータの無効化をしてはならない


## テンプレートパラメータ制約
- (1), (2), (3), (4), (5), (6) : 型`T`が[`std::move_constructible`](/reference/concepts/move_constructible.md)要件を満たすこと
- (1), (2), (4), (5) : 以下の全ての演算結果の型が、型`T`に変換可能であること
    - `binary_op1(init, init)`
    - `binary_op1(init, binary_op2(*first1, *first2))`
    - `binary_op1(binary_op2(*first1, *first2), init)`
    - `binary_op1(binary_op2(*first1, *first2), binary_op2(*first1, *first2))`
- (3), (6) : 以下の全ての演算結果の型が、型`T`に変換可能であること
    - `binary_op(init, init)`
    - `binary_op(init, unary_op(*first))`
    - `binary_op(unary_op(*first), init)`
    - `binary_op(unary_op(*first), unary_op(*first))`


## 効果
- (1) : 以下と�価
    ```cpp
    return transform_reduce(first1, last1, first2, init, plus<>(), multiplies<>);
    ```
    * plus[link /reference/functional/plus.md]
    * multiplies[link /reference/functional/multiplies.md]

- (2), (5) : 範囲`[first1, last1)`と`[first2, first2+(last1 - first1))`について、リスト`[init, binary_op2(*first1, *first2), binary_op2(*(first1 + 1), *(first2 + 1)), binary_op2(*(first1 + 2), *(first2 + 2)), ...]`を任意の部分リストへ分割し、各部分リストの要素を順不同に`binary_op1(a, b)`を実行していき、それを実行していった結果同士も順不同に`binary_op1(sum1, sum2)`のように集計して返す

- (3), (6) : 範囲`[first, last)`について、リスト`[init, unary_op(*first), unary_op(*(first + 1)), unary_op(*(first + 2)), ... unary_op(*(first + (last - first - 1)))]`を任意の部分リストへ分割し、各部分リストの要素を順不同に`binary_op(a, b)`を実行していき、それを実行していった結果同士も順不同に`binary_op(sum1, sum2)`のように集計して返す

- (4) : 以下と�価
    ```cpp
    return transform_reduce(std::forward<ExecutionPolicy>(exec),
                            first1, last1, first2, init, plus<>(), multiplies<>());
    ```
    * std::forward[link /reference/utility/forward.md]
    * plus[link /reference/functional/plus.md]
    * multiplies[link /reference/functional/multiplies.md]


## 計算量
- (1), (2), (4), (5) : 関数オブジェクト`binary_op1`と`binary_op2`を、O(`last1 - first1`)計算量の回数だけ適用する
- (3), (6) : 関数オブジェクト`unary_op`と`binary_op`をO(`last - first`)計算量の回数だけ適用する


## 備考
- (3), (6) : 関数オブジェクト`unary_op`は初期値`init`に対しては適用しない


## 例
```cpp example
#include <iostream>
#include <vector>
#include <numeric>

int main()
{
  const std::vector<int> v1 = {1, 2, 3, 4, 5};
  const std::vector<int> v2 = {2, 3, 4, 5, 6};

  // (1) : 2つのリストを集計する
  // sum1 = 1*2 + 2*3 + 3*4 + 4*5, 5*6
  int sum1 = std::transform_reduce(v1.begin(), v1.end(), v2.begin(), 0);
  std::cout << "sum1 : " << sum1 << std::endl;

  // (2) : 2つのリストを集計する。
  // リストを集計する2項演算と、2つのリストの要素を掛け合わせる2項演算を指定する
  int sum2 = std::transform_reduce(v1.begin(), v1.end(), v2.begin(), 0,
                                  [](int a, int b) { return a + b; },  // 集計関数
                                  [](int a, int b) { return a * b; }); // 2つの要素を合成する関数
  std::cout << "sum2 : " << sum2 << std::endl;

  // (3) : リストの各要素を変換しながら集計する
  // 1*2 + 2*2 + 3*2 + 4*2 + 5*2
  int sum3 = std::transform_reduce(v1.begin(), v1.end(), 0,
                                   [](int acc, int i) { return acc + i; }, // 集計関数
                                   [](int x) { return x * 2; });           // 変換関数
  std::cout << "sum3 : " << sum3 << std::endl;
}
```
* std::transform_reduce[color ff0000]

### 出力
```
sum1 : 70
sum2 : 70
sum3 : 30
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 5.0.0
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0024R2 The Parallelism TS Should be Standardized](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0024r2.html)
- [P0452R1 Unifying `<numeric>` Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0452r1.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P0574R1: Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [P0623R0 Final C++17 Parallel Algorithms Fixes](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0623r0.html)
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
