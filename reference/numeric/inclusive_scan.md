# inclusive_scan
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator
    inclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result);     // (1) C++17
  template <class InputIterator, class OutputIterator>
  constexpr OutputIterator
    inclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result);     // (1) C++20

  template <class InputIterator, class OutputIterator, class BinaryOperation>
  OutputIterator
    inclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   BinaryOperation binary_op); // (2) C++17
  template <class InputIterator, class OutputIterator, class BinaryOperation>
  constexpr OutputIterator
    inclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   BinaryOperation binary_op); // (2) C++20

  template <class InputIterator, class OutputIterator, class BinaryOperation, class T>
  OutputIterator
    inclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   BinaryOperation binary_op,
                   T init);                    // (3) C++17
  template <class InputIterator, class OutputIterator, class BinaryOperation, class T>
  constexpr OutputIterator
    inclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   BinaryOperation binary_op,
                   T init);                    // (3) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  ForwardIterator2
    inclusive_scan(ExecutionPolicy&& exec,
                   ForwardIterator1 first,
                   ForwardIterator1 last,
                   ForwardIterator2 result);   // (4) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class BinaryOperation>
  ForwardIterator2
    inclusive_scan(ExecutionPolicy&& exec,
                   ForwardIterator1 first,
                   ForwardIterator1 last,
                   ForwardIterator2 result,
                   BinaryOperation binary_op); // (5) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class BinaryOperation, class T>
  ForwardIterator2
    inclusive_scan(ExecutionPolicy&& exec,
                   ForwardIterator1 first,
                   ForwardIterator1 last,
                   ForwardIterator2 result,
                   BinaryOperation binary_op,
                   T init);                    // (6) C++17
}
```

## 概要
イテレータ範囲`[first, last)`の部分和を計算する。この関数は、i番目の部分和を求める際にi番目の要素を含め、範囲`[0, i]`までの部分和を計算する。

`inclusive_scan()`の引数として、初期値`0`、およびシーケンス`{1, 2, 3}`が与えられた場合、以下のような結果が行われる：

```cpp
{
  1, // (0 + ) 1
  3, // (0 + ) 1 + 2
  6  // (0 + ) 1 + 2 + 3
}
```

初期値が与えられない場合、その演算は行われない (初期値の代わりにイテレータの要素型を値構築した値を使用したりはしない)。

- (1) : 二項演算として`operator+`を使用して部分和を求める
- (2) : 二項演算として任意の関数オブジェクト`binary_op`を使用して部分和を求める
- (3) : 初期値を`init`、二項演算として任意の関数オブジェクト`binary_op`を使用して部分和を求める
- (4) : (1)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (5) : (2)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (6) : (3)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる


## 要件
- (2), (3), (5), (6) : 関数オブジェクト`binary_op`の呼び出しは、イテレータ範囲`[first, last]`およびイテレータ範囲`[result, result + (last - first)]`の要素変更およびイテレータの無効化をしてはならない


## テンプレートパラメータ制約
- (1), (2), (4), (5) : `ForwardIterator`の要素型が[`std::move_constructible`](/reference/concepts/move_constructible.md)要件を満たすこと
- (3), (6) : 型`T`が[`std::move_constructible`](/reference/concepts/move_constructible.md)要件を満たすこと
- (1), (2), (4), (5) : 以下の全ての演算結果の型が、`ForwardIterator`の要素型に変換可能であること
    - `binary_op(*first, *first)`
- (3), (6) : 以下の全ての演算結果の型が、型`T`に変換可能であること
    - `binary_op(init, init)`
    - `binary_op(init, *first)`
    - `binary_op(*first, *first)`


## 効果
- (1) : 以下と等価
    ```cpp
    return inclusive_scan(first, last, result, plus<>());
    ```
    * plus[link /reference/functional/plus.md]

- (2), (5) : 範囲`[0, last - first)`の各値を`K`として、出力先のイテレータ`result + K`に、`{*first, *(first + 1), *(first + 2), ..., *(last - 1)}`の`K`番目までの要素の合計値を順不同に代入する

- (3), (6) : 範囲`[0, last - first)`の各値を`K`として、出力先のイテレータ`result + K`に、初期値を`init`として`{*first, *(first + 1), *(first + 2), ..., *(last - 1)}`の`K`番目までの要素の合計値を順不同に代入する

- (4) : 以下と等価
    ```cpp
    return inclusive_scan(std::forward<ExecutionPolicy>(exec),
                          first, last, result, plus<>());
    ```
    * std::forward[link /reference/utility/forward.md]
    * plus[link /reference/functional/plus.md]


## 戻り値
結果範囲の末尾イテレータを返す


## 計算量
関数オブジェクト`binary_op`をO(`last - first`)回だけ適用する


## 備考
- (1), (2) : `result`は`first`と同値になるだろう
- (2), (4) : 関数オブジェクト`binary_op`に数学的な結合性がない場合、この関数は非決定的な動作になる可能性がある


## 例
```cpp example
#include <iostream>
#include <vector>
#include <numeric>

int main()
{
  // (1)
  {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::vector<int> result(v.size());

    // result[0] = 1
    // result[1] = 1 + 2
    // result[2] = 1 + 2 + 3
    // result[3] = 1 + 2 + 3 + 4
    // result[4] = 1 + 2 + 3 + 4 + 5
    std::inclusive_scan(v.begin(), v.end(), result.begin());

    for (int x : result) {
      std::cout << x << ' ';
    }
    std::cout << std::endl;
  }

  // (2)
  {
    std::vector<int> v = {-5, 1, 0, 3, 2};
    std::vector<int> result(v.size());

    // result[0] = -5
    // result[1] = max(-5, 1)
    // result[2] = max(max(-5, 1), 0)
    // result[3] = max(max(max(-5, 1), 0), 3)
    // result[4] = max(max(max(max(-5, 1), 0), 3), 2)
    std::inclusive_scan(v.begin(), v.end(), result.begin(),
                        [](int a, int b) { return std::max(a, b); });

    for (int x : result) {
      std::cout << x << ' ';
    }
    std::cout << std::endl;
  }

  // (3)
  {
    std::vector<int> v = {-5, 1, 0, 3, 2};
    std::vector<int> result(v.size());

    // result[0] = max(0, -5)
    // result[1] = max(max(0, -5), 1)
    // result[2] = max(max(max(0, -5), 1), 0)
    // result[3] = max(max(max(max(0, -5), 1), 0), 3)
    // result[4] = max(max(max(max(max(0, -5), 1), 0), 3), 2)
    std::inclusive_scan(v.begin(), v.end(), result.begin(),
                        [](int a, int b) { return std::max(a, b); }, 0);

    for (int x : result) {
      std::cout << x << ' ';
    }
    std::cout << std::endl;
  }
}
```
* std::inclusive_scan[color ff0000]

### 出力
```
1 3 6 10 15 
-5 1 1 3 3 
0 1 1 3 3 
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0024R2 The Parallelism TS Should be Standardized](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0024r2.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P0574R1: Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
