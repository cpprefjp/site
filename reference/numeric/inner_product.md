# inner_product
* numeric[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class T>
  T inner_product(InputIterator1 first1, InputIterator1 last1,
                  InputIterator2 first2, T init); // (1)

  template <class InputIterator1, class InputIterator2, class T,
            class BinaryOperation1, class BinaryOperation2>
  T inner_product(InputIterator1 first1, InputIterator1 last1,
                  InputIterator2 first2, T init,
                  BinaryOperation1 binary_op1,
                  BinaryOperation2 binary_op2);   // (2)
}
```

## 概要
2つのシーケンスの内積(inner product)を計算する。

この関数は、範囲`[first1, last1)`および範囲`[first2, first2 + (last1 - first1))`をそれぞれ任意次元のベクトルとみなし、その2つのベクトルの内積を計算する。

範囲`[first1, last1)`をベクトル`v`、範囲`[first2, first2 + (last1 - first1))`をベクトル`u`として、この関数は以下の効果を持つ：

- (1) : `init + (v[0] * u[0]) + (v[1] * u[1]) + … (v[N - 1] * u[N - 1])`
- (2) : `operator()+`を`binary_op1`、`operator*()`を`binary_op2`で代用して、(1)の演算を行う


## 要件
- 型`T`が[CopyConstructible](/reference/concepts/CopyConstructible.md)であること
- 型`T`が[CopyAssignable](/reference/concepts/CopyAssignable.md)であること
- C++03まで : `binary_op1`および`binary_op2`は、副作用を起こしてはならない
- C++11から : `binary_op1`および`binary_op2`が、範囲`[first1, last1]`と範囲`[first2, first2 + (last1 - first2)]`の要素変更およびイテレータの無効化をしてはならない


## 効果
- (1) : `acc = init;`、範囲`[first1, last1)`の各イテレータを`i`、範囲`[first2, first2 + (last1 - first1))`の各イテレータ`をj`として、`acc = acc + (*i) * (*j);` の演算を行い、`acc`を返す
- (2) : `acc = init;`、範囲`[first1, last1)`の各イテレータを`i`、範囲`[first2, first2 + (last1 - first1))`の各イテレータ`をj`として、`acc = binary_op1(acc, binary_op2((*i), (*j)));` の演算を行い、`acc`を返す


## 戻り値
演算によって求められた内積値を返す


## 計算量
- (1) : n 回の加算処理と n 回の乗算処理を行う。
- (2) : n 回の `binary_op1` 呼び出しと n 回の `binary_op2` 呼び出しを行う。

ここで、n は `last1 - first1`とする。


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
* u.begin()[link /reference/vector/begin.md]

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
    init = init + (*first1++ * *first2++);
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
    init = binary_op1(init, binary_op2(*first1++, *first2++));
  return init;
}
```

