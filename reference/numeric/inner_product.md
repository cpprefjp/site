# inner_product
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class T>
  T inner_product(InputIterator1 first1,
                  InputIterator1 last1,
                  InputIterator2 first2,
                  T init);                        // (1) C++03
  template <class InputIterator1, class InputIterator2, class T>
  constexpr T
    inner_product(InputIterator1 first1,
                  InputIterator1 last1,
                  InputIterator2 first2,
                  T init);                        // (1) C++20

  template <class InputIterator1, class InputIterator2, class T,
            class BinaryOperation1, class BinaryOperation2>
  T inner_product(InputIterator1 first1,
                  InputIterator1 last1,
                  InputIterator2 first2,
                  T init,
                  BinaryOperation1 binary_op1,
                  BinaryOperation2 binary_op2);   // (2) C++03
  template <class InputIterator1, class InputIterator2, class T,
            class BinaryOperation1, class BinaryOperation2>
  constexpr T
    inner_product(InputIterator1 first1,
                  InputIterator1 last1,
                  InputIterator2 first2,
                  T init,
                  BinaryOperation1 binary_op1,
                  BinaryOperation2 binary_op2);   // (2) C++20
}
```

## 概要
2つのシーケンスの内積(inner product)を計算する。

この関数は、イテレータ範囲`[first1, last1)`およびイテレータ範囲`[first2, first2 + (last1 - first1))`をそれぞれ任意次元のベクトルとみなし、その2つのベクトルの内積を計算する。

イテレータ範囲`[first1, last1)`をベクトル`v`、イテレータ範囲`[first2, first2 + (last1 - first1))`をベクトル`u`として、この関数は以下の効果を持つ：

- (1) : `init + (v[0] * u[0]) + (v[1] * u[1]) + … (v[N - 1] * u[N - 1])`
- (2) : `operator()+`を`binary_op1`、`operator*()`を`binary_op2`で代用して、(1)の演算を行う


## 要件
- C++03まで : `binary_op1`および`binary_op2`は、副作用を起こしてはならない
- C++11から : `binary_op1`および`binary_op2`が、イテレータ範囲`[first1, last1]`とイテレータ範囲`[first2, first2 + (last1 - first2)]`の要素変更およびイテレータの無効化をしてはならない


## テンプレートパラメータ制約
- 型`T`が[コピー構築可能](/reference/concepts/copy_constructible.md)であること
- 型`T`が[コピー代入可能](/reference/type_traits/is_copy_assignable.md)であること


## 効果
- (1) :
    - C++03 : `acc = init;`、イテレータ範囲`[first1, last1)`の各イテレータを`i`、イテレータ範囲`[first2, first2 + (last1 - first1))`の各イテレータを`j`として、`acc = acc + (*i) * (*j);` の演算を行い、`acc`を返す
    - C++20 : `acc = init;`、イテレータ範囲`[first1, last1)`の各イテレータを`i`、イテレータ範囲`[first2, first2 + (last1 - first1))`の各イテレータを`j`として、`acc =` [`std::move`](/reference/utility/move.md)`(acc) + (*i) * (*j);` の演算を行い、`acc`を返す
- (2) :
    - C++03 : `acc = init;`、イテレータ範囲`[first1, last1)`の各イテレータを`i`、イテレータ範囲`[first2, first2 + (last1 - first1))`の各イテレータを`j`として、`acc = binary_op1(acc, binary_op2((*i), (*j)));` の演算を行い、`acc`を返す
    - C++20 : `acc = init;`、イテレータ範囲`[first1, last1)`の各イテレータを`i`、イテレータ範囲`[first2, first2 + (last1 - first1))`の各イテレータを`j`として、`acc = binary_op1(`[`std::move`](/reference/utility/move.md)`(acc), binary_op2((*i), (*j)));` の演算を行い、`acc`を返す


## 戻り値
演算によって求められた内積値を返す


## 計算量
`last1 - first1`をnであるとして、

- (1) : n 回の加算処理と n 回の乗算処理を行う。
- (2) : n 回の `binary_op1` 呼び出しと n 回の `binary_op2` 呼び出しを行う。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <numeric>

int main()
{
  // 任意次元のベクトルvとuの内積を求める。
  // v[0]はXベクトル、v[1]はYベクトル。
  const std::vector<float> v = {-1.0f, 1.0f};
  const std::vector<float> u = {1.0f, -2.0f};

  float result = std::inner_product(
                   v.begin(), v.end(), // ひとつ目のベクトル
                   u.begin(),          // ふたつ目のベクトル(v以上の次元数を持つこと)
                   0.0f);              // 内積の初期値(この値に対して加算が行われる)

  std::cout << result << std::endl;
}
```
* std::inner_product[color ff0000]
* u.begin()[link /reference/vector/vector/begin.md]

### 出力
```
-3
```


## 実装例
```cpp
// (1)
template <class InputIterator1, class InputIterator2, class T>
T inner_product(InputIterator1 first1, InputIterator1 last1,
                InputIterator2 first2, T init) {
  while (first1 != last1)
    init = std::move(init) + (*first1++ * *first2++);
  return init;
}

// (2)
template <class InputIterator1, class InputIterator2, class T,
          class BinaryOperation1, class BinaryOperation2>
T inner_product(InputIterator1 first1, InputIterator1 last1,
                InputIterator2 first2, T init,
                BinaryOperation1 binary_op1,
                BinaryOperation2 binary_op2) {
  while (first1 != last1)
    init = binary_op1(std::move(init), binary_op2(*first1++, *first2++));
  return init;
}
```
* std::move[link /reference/utility/move.md]


## 参照
- [P0616R0 De-pessimize legacy `<numeric>` algorithms with `std::move`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0616r0.pdf)
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
