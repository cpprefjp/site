# exclusive_scan
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std{
  template <class InputIterator, class OutputIterator, class T>
  OutputIterator
    exclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   T init);                    // (1) C++17
  template <class InputIterator, class OutputIterator, class T>
  constexpr OutputIterator
    exclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   T init);                    // (1) C++20

  template <class InputIterator, class OutputIterator, class T, class BinaryOperation>
  OutputIterator
    exclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   T init,
                   BinaryOperation binary_op); // (2) C++17
  template <class InputIterator, class OutputIterator, class T, class BinaryOperation>
  constexpr OutputIterator
    exclusive_scan(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   T init,
                   BinaryOperation binary_op); // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2, class T>
  ForwardIterator2
    exclusive_scan(ExecutionPolicy&& exec,
                   ForwardIterator1 first,
                   ForwardIterator1 last,
                   ForwardIterator2 result,
                   T init);                    // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2, class T,
            class BinaryOperation>
  ForwardIterator2
    exclusive_scan(ExecutionPolicy&& exec,
                   ForwardIterator1 first,
                   ForwardIterator1 last,
                   ForwardIterator2 result,
                   T init,
                   BinaryOperation binary_op); // (4) C++17
}
```

## 概要
範囲の部分和を計算する。この関数は、i番目の部分和を求める際にi番目の要素を含めず範囲`[0, i)`までの部分和を計算する。

`exclusive_scan()`の引数として初期値`0`、およびシーケンス`{1, 2, 3}`が与えられた場合、以下のような結果が行われる：

```cpp
{
  0, // 0
  1, // 0 + 1
  3  // 0 + 1 + 2
}
```

- (1) : 初期値を`init`、二項演算として`operator+`を使用して部分和を求める
- (2) : 初期値を`init`、二項演算として任意の関数オブジェクト`binary_op`を使用して部分和を求める
- (3) : (1)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (4) : (2)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる


## 要件
- (2), (4) :
    - 関数オブジェクト`binary_op`の呼び出しは、範囲`[first, last]`および範囲`[result, result + (last - first)]`の要素変更およびイテレータの無効化をしてはならない


## テンプレートパラメータ制約
- (1), (2), (3), (4) : 型`T`が[`std::move_constructible`](/reference/concepts/move_constructible.md)要件を満たすこと
- (2), (4) : 以下の全ての演算結果の型が、型`T`に変換可能であること
    - `binary_op(init, init)`
    - `binary_op(init, *first)`
    - `binary_op(*first, *first)`


## 効果
- (1) : 以下と�価
    ```cpp
    return exclusive_scan(first, last, result, init, plus<>());
    ```
    * plus[link /reference/functional/plus.md]

- (2), (4) : 範囲`[0, last - first)`の各値を`K`として、出力先のイテレータ`result + K`に、`{init, *first, *(first + 1), *(first + 2), ..., *(last - 1)}`の`K`番目までの要素の合計値を順不同に代入する

- (3) : 以下と�価
    ```cpp
    return exclusive_scan(std::forward<ExecutionPolicy>(exec),
                          first, last, result, init, plus<>());
    ```
    * std::forward[link /reference/utility/forward.md]
    * plus[link /reference/functional/plus.md]


## 戻り値
結果範囲の末尾イテレータを返す


## 計算量
関数オブジェクト`binary_op`をO(`last - first`)計算量の回数だけ適用する


## 備考
- (1), (2) : `result`は`first`と同値になるだろう
- (2), (4) : 関数オブジェクト`binary_op`に数�的な結合性がない場合、この関数は非決定的な動作になる可能性がある


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

    // result[0] = 0
    // result[1] = 0 + 1
    // result[2] = 0 + 1 + 2
    // result[3] = 0 + 1 + 2 + 3
    // result[4] = 0 + 1 + 2 + 3 + 4
    std::exclusive_scan(v.begin(), v.end(), result.begin(), 0);

    for (int x : result) {
      std::cout << x << ' ';
    }
    std::cout << std::endl;
  }

  // (2)
  {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::vector<int> result(v.size());

    // result[0] = 0
    // result[1] = max(0, 1)
    // result[2] = max(max(0, 1), 2)
    // result[3] = max(max(max(0, 1), 2), 3)
    // result[4] = max(max(max(max(0, 1), 2), 3), 4)
    std::exclusive_scan(v.begin(), v.end(), result.begin(), 0,
                        [](int a, int b) { return std::max(a, b); });

    for (int x : result) {
      std::cout << x << ' ';
    }
    std::cout << std::endl;
  }
}
```
* std::exclusive_scan[color ff0000]

### 出力
```
0 1 3 6 10 
0 1 2 3 4 
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
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P0574R1: Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [Finding the number of occurrences of keys and the positions of first occurrences of keys by CUDA Thrust - StackOverflow](https://stackoverflow.com/questions/8792926/finding-the-number-of-occurrences-of-keys-and-the-positions-of-first-occurrences/)
    - この関数の用途として、[`std::multiset`](/reference/set/multiset.md)のような構成になっているシーケンスから、それぞれの�ーがはじまるインデックスのリストを取得するために使用できる
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
