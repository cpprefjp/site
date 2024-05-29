# transform_exclusive_scan
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator, class T,
            class BinaryOperation, class UnaryOperation>
  OutputIterator
    transform_exclusive_scan(InputIterator first,
                             InputIterator last,
                             OutputIterator result,
                             T init,
                             BinaryOperation binary_op,
                             UnaryOperation unary_op);  // (1) C++17
  template <class InputIterator, class OutputIterator, class T,
            class BinaryOperation, class UnaryOperation>
  constexpr OutputIterator
    transform_exclusive_scan(InputIterator first,
                             InputIterator last,
                             OutputIterator result,
                             T init,
                             BinaryOperation binary_op,
                             UnaryOperation unary_op);  // (1) C++20

  template <class ExecutionPolicy,
            class ForwardIterator1, class ForwardIterator2, class T,
            class BinaryOperation, class UnaryOperation>
  ForwardIterator2
    transform_exclusive_scan(ExecutionPolicy&& exec,
                             ForwardIterator1 first,
                             ForwardIterator1 last,
                             ForwardIterator2 result,
                             T init,
                             BinaryOperation binary_op,
                             UnaryOperation unary_op);  // (2) C++17
}
```

## 概要
イテレータ範囲`[first, last)`の要素を変換しながら部分和を計算する。この関数は、i番目の部分和を求める際にi番目の要素を含めず範囲`[0, i)`までの部分和を計算する。

`transform_exclusive_scan()`の引数として初期値`0`、シーケンス`{1, 2, 3}`が与えられ、和に相当する二項演算関数オブジェクト`binary_op`を`operator+`、要素変換の関数オブジェクト`unary_op`をパラメータをそのまま返す関数`f()`であるとして、、以下のような結果が行われる：

```cpp
{
  0, // 0
  1, // 0 + f(1)
  3  // 0 + f(1) + f(2)
}
```

- (1) : 初期値を`init`、二項演算として任意の関数オブジェクト`binary_op`、要素を変換する関数オブジェクト`unary_op`を使用して部分和を求める
- (2) : (1)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる


## 要件
- (1), (2) :
    - 関数オブジェクト`unary_op`と`binary_op`の呼び出しは、イテレータ範囲`[first, last]`およびイテレータ範囲`[result, result + (last - first)]`の要素変更およびイテレータの無効化をしてはならない


## テンプレートパラメータ制約
- (1), (2) :
    - 型`T`が[`std::move_constructible`](/reference/concepts/move_constructible.md)要件を満たすこと
    - 以下の全ての演算結果の型が、型`T`に変換可能であること
        - `binary_op(init, init)`
        - `binary_op(init, unary_op(*first))`
        - `binary_op(unary_op(*first), unary_op(*first))`


## 効果
- (1), (2) : 範囲`[0, last - first)`の各値を`K`として、出力先のイテレータ`result + K`に、`{init, unary_op(*first), unary_op(*(first + 1)), unary_op(*(first + 2)), ..., unary_op(*(last - 1))}`の`K`番目までの要素の合計値を`binary_op`を使用して計算し、順不同に代入する


## 戻り値
結果範囲の末尾イテレータを返す


## 計算量
関数オブジェクト`unary_op`と`binary_op`をO(`last - first`)回だけ適用する


## 備考
- (1), (2) :
    - `result`は`first`と同値になるだろう
    - 関数オブジェクト`binary_op`に数学的な結合性がない場合、この関数は非決定的な動作になる可能性がある
    - 関数オブジェクト`unary_op`は初期値`init`に対しては適用しない


## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>
#include <numeric>

int main()
{
  std::vector<std::string> v = {"1", "2", "3", "4", "5"};
  std::vector<int> result(v.size());

  // result[0] = 0
  // result[1] = 0 + stoi("1")
  // result[2] = 0 + stoi("1") + stoi("2")
  // result[3] = 0 + stoi("1") + stoi("2") + stoi("3")
  // result[4] = 0 + stoi("1") + stoi("2") + stoi("3") + stoi("4")
  std::transform_exclusive_scan(v.begin(), v.end(), result.begin(), 0,
                      [](int a, int b) { return a + b; },
                      [](const std::string& s) { return std::stoi(s); });

  for (int x : result) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::transform_exclusive_scan[color ff0000]
* result.begin()[link /reference/vector/vector/begin.md]
* std::stoi[link /reference/string/stoi.md]

### 出力
```
0 1 3 6 10 
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0024R2 The Parallelism TS Should be Standardized](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0024r2.html)
- [P0452R1 Unifying `<numeric>` Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0452r1.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P0574R1: Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
