# reduce
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator>
  typename iterator_traits<InputIterator>::value_type
    reduce(InputIterator first, InputIterator last);         // (1) C++17
  template <class InputIterator>
  constexpr typename iterator_traits<InputIterator>::value_type
    reduce(InputIterator first, InputIterator last);         // (1) C++20

  template <class InputIterator, class T>
  T reduce(InputIterator first, InputIterator last, T init); // (2) C++17
  template <class InputIterator, class T>
  constexpr T
    reduce(InputIterator first, InputIterator last, T init); // (2) C++20

  template <class InputIterator, class T, class BinaryOperation>
  T reduce(InputIterator first, InputIterator last, T init,
           BinaryOperation binary_op);                       // (3) C++17
  template <class InputIterator, class T, class BinaryOperation>
  constexpr T
    reduce(InputIterator first, InputIterator last, T init,
           BinaryOperation binary_op);                       // (3) C++20

  template <class ExecutionPolicy, class ForwardIterator>
  typename iterator_traits<ForwardIterator>::value_type
    reduce(ExecutionPolicy&& exec,
           ForwardIterator first,
           ForwardIterator last);                            // (4) C++17

  template <class ExecutionPolicy, class ForwardIterator, class T>
  T reduce(ExecutionPolicy&& exec,
           ForwardIterator first,
           ForwardIterator last,
           T init);                                          // (5) C++17

  template <class ExecutionPolicy, class ForwardIterator, class T, class BinaryOperation>
  T reduce(ExecutionPolicy&& exec,
           ForwardIterator first,
           ForwardIterator last,
           T init,
           BinaryOperation binary_op);                       // (6) C++17
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]

## 概要
`reduce()`は、イテレータ範囲`[first, last)`を集計する関数である。[`accumulate()`](accumulate.md)関数は範囲の先頭から順に要素を集計するが、この関数は並列計算のために集計順を規定しない。

初期値(`init`)とイテレータ範囲`[first, last)`を合算したリストの任意の組み合わせに、順不同で`binary_op(binary_op(a, b), binary_op(c, d))`のように適用していき、集計値を計算する。

- (1) : 集計の初期値をイテレータ範囲の要素型の値初期化値 (算術型なら`0`) とし、二項演算に`operator+`を使用する。それによって、このオーバーロードは、範囲の合計値を求める処理となる
- (2) : 初期値をパラメータ`init`として受け取り、二項演算は`operator+`を使用する
- (3) : 初期値をパラメータ`init`として受け取り、任意の二項演算`binary_op`を使用して集計を行う
- (4) : (1)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (5) : (2)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (6) : (3)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる


## 要件
- (3), (6) : 関数オブジェクト`binary_op`の呼び出しは、イテレータ範囲`[first, last]`の要素変更およびイテレータの無効化をしてはならない


## テンプレートパラメータ制約
- (2), (3), (5), (6) : 型`T`が[`std::move_constructible`](/reference/concepts/move_constructible.md)要件を満たすこと
- (3), (6) : 以下の全ての演算結果の型が、型`T`に変換可能であること
    - `binary_op(init, *first)`
    - `binary_op(*first, init)`
    - `binary_op(init, init)`
    - `binary_op(*first, *first)`


## 効果
- (1) : 以下と等価
    ```cpp
    return reduce(first, last,
                  typename iterator_traits<InputIterator>::value_type{});
    ```
    * iterator_traits[link /reference/iterator/iterator_traits.md]

- (2) : 以下と等価
    ```cpp
    return reduce(first, last, init, plus<>());
    ```
    * plus[link /reference/functional/plus.md]

- (3), (6) : イテレータ範囲`[first, last)`について、リスト`[init, *first, *(first + 1), *(first + 2), ... *(first + (last - first - 1))]`を任意の部分リストへ分割し、各部分リストの要素を順不同に`binary_op(a, b)`を実行していき、それを実行していった結果同士も順不同に`binary_op(sum1, sum2)`のように集計して返す

- (4) : 以下と等価
    ```cpp
    return reduce(std::forward<ExecutionPolicy>(exec), first, last,
                  typename iterator_traits<ForwardIterator>::value_type{});
    ```
    * std::forward[link /reference/utility/forward.md]
    * iterator_traits[link /reference/iterator/iterator_traits.md]

- (5) : 以下と等価
    ```cpp
    return reduce(std::forward<ExecutionPolicy>(exec), first, last, init, plus<>());
    ```
    * std::forward[link /reference/utility/forward.md]
    * plus[link /reference/functional/plus.md]


## 計算量
関数オブジェクト`binary_op`をO(`last - first`)回だけ適用する


## 例
```cpp example
#include <iostream>
#include <vector>
#include <numeric>

int main()
{
  const std::vector<int> v = {1, 2, 3, 4, 5};

  // (1) : 合計値を求める
  // イテレータの要素型で集計される
  int sum = std::reduce(v.begin(), v.end());
  std::cout << "sum : " << sum << std::endl;

  // (2) : 合計値をlong long型として求める
  // reduceの第3引数がlong long型のゼロを表す0LLになっていることに注意
  // reduceの戻り値型は、第3引数の型となるため、変数sum_llの型はlong long
  auto sum_ll = std::reduce(v.begin(), v.end(), 0LL);
  std::cout << "sum_ll : " << sum_ll << std::endl;

  // (3) : 任意の二項演算を行う
  // ここでは、初期値を1として、全ての要素を掛け合わせている
  int product = std::reduce(v.begin(), v.end(), 1, [](int acc, int i) {
    return acc * i;
  });
  std::cout << "product : " << product << std::endl;
}
```
* std::reduce[color ff0000]

### 出力
```
sum : 15
sum_ll : 15
product : 120
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
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P0574R1: Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
