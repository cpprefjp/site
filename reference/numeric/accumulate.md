# accumulate
* numeric[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class T>
  T accumulate(InputIterator first, InputIterator last, T init);           // (1) C++03
  template <class InputIterator, class T>
  constexpr T accumulate(InputIterator first, InputIterator last, T init); // (1) C++20

  template <class InputIterator, class T, class BinaryOperation>
  T accumulate(InputIterator first, InputIterator last, T init,
               BinaryOperation binary_op);                                 // (2) C++03
  template <class InputIterator, class T, class BinaryOperation>
  constexpr T accumulate(InputIterator first, InputIterator last, T init,
                         BinaryOperation binary_op);                       // (2) C++20
}
```

## 概要
`accumulate()`は、イテレータ範囲`[first, last)`を集計する関数である。

初期値(`init`)に対して、イテレータ範囲`[first, last)`の各要素`i`を前から順番に、任意の二項演算関数`binary_op`を`init = f(init, *i)`のように適用していき、範囲の全ての要素を集計した結果を戻り値として返す。

他の言語でこのような処理は、`foldL` (Haskell)、`reduce` (Common Lisp, Ruby)、`aggregate` (C#)などと呼ばれている。

- (1) : 二項演算をデフォルトで`operator+`とする。それによって、このオーバーロードは、範囲の合計値を求める処理となる
- (2) : 任意の二項演算関数を受け取って集計処理を行う


## 要件
- C++03まで : `binary_op`は副作用を起こしてはならない
- C++11から : `binary_op`は、イテレータ範囲`[first, last]`の要素変更およびイテレータの無効化をしてはならない


## テンプレートパラメータ制約
- `T`が[コピー構築可能](/reference/concepts/copy_constructible.md)であること
- `T`が[コピー代入可能](/reference/type_traits/is_copy_assignable.md)であること


## 効果
- (1) : `binary_op`を`operator+`として (2) の効果を適用する
- (2) :
    - C++03 : `acc = init`、`[first, last)`の各イテレータを`i`とし、`acc = binary_op(acc, *i)`を範囲の全要素に対して適用し、その結果となる`acc`を返す
    - C++20 : `acc = init`、`[first, last)`の各イテレータを`i`とし、`acc = binary_op(`[`std::move`](/reference/utility/move.md)`(acc), *i)`を範囲の全要素に対して適用し、その結果となる`acc`を返す


## 戻り値
集計結果の値


## 計算量
イテレータ範囲`[first, last)`の要素数に対して線形時間


## 備考
- この関数は並列アルゴリズムに対応していない。計算順序を規程せず、並列アルゴリズムに対応したバージョンとして[`std::reduce()`](reduce.md)関数が定義されている


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <string>
#include <numeric>

int main()
{
  const std::vector<int> v = {1, 2, 3, 4, 5};
  const std::vector<std::string> v2 = {"aaa", "bbb", "ccc"};

  // (1) : 合計値を求める
  int sum = std::accumulate(v.begin(), v.end(), 0);
  std::cout << "sum : " << sum << std::endl;

  // (1) : 合計値をlong long型として求める
  // accumulateの第3引数がlong long型のゼロを表す0LLになっていることに注意
  // accumulateの戻り値型は、第3引数の型となるため、変数sum_llの型はlong long
  auto sum_ll = std::accumulate(v.begin(), v.end(), 0LL);
  std::cout << "sum_ll : " << sum_ll << std::endl;

  // (1) : 文字列のリストを連結する
  std::string concatenate = std::accumulate(v2.begin(), v2.end(), std::string());
  std::cout << "concat : " << concatenate << std::endl;

  // (2) : 任意の二項演算を行う
  // ここでは、初期値を1として、全ての要素を掛け合わせている
  int product = std::accumulate(v.begin(), v.end(), 1, [](int acc, int i) {
    return acc * i;
  });
  std::cout << "product : " << product << std::endl;
}
```
* std::accumulate[color ff0000]

#### 出力
```
sum : 15
sum_ll : 15
concat : aaabbbccc
product : 120
```


### クラスの一部のメンバ変数を集計する
```cpp
#include <iostream>
#include <numeric>
#include <vector>
#include <string>

struct X {
  int value;
  std::string name;
};

int main() {
  std::vector<X> v = {
    {1, "AAA"},
    {2, "BBB"},
    {3, "CCC"}
  };

  int sum = std::accumulate(v.begin(), v.end(), 0, [](int acc, const X& x) {
    return acc + x.value;
  });

  std::cout << sum << std::endl;
}
```
* std::accumulate[color ff0000]

#### 出力
```
6
```


## 実装例
```cpp
// (1)
template <class InputIterator, class T>
T accumulate(InputIterator first, InputIterator last, T init) {
  while (first != last)
    init = init + *first++;
  return init;
}

// (2)
template <class InputIterator, class T, class BinaryOperation>
T accumulate(InputIterator first, InputIterator last, T init,
             BinaryOperation binary_op) {
  while (first != last)
    init = binary_op(std::move(init), *first++);
  return init;
}
```
* std::move[link /reference/utility/move.md]


## 参照
- [P0616R0 De-pessimize legacy `<numeric>` algorithms with `std::move`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0616r0.pdf)
- [P1645R1 `constexpr` for `<numeric>` algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)
    - C++20で、並列バージョン以外の数値計算アルゴリズムが`constexpr`対応した
