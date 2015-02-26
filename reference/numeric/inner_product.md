#inner_product
* numeric[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class T>
  T inner_product(InputIterator1 first1, InputIterator1 last1,
                  InputIterator2 first2, T init);

  template <class InputIterator1, class InputIterator2, class T,
            class BinaryOperation1, class BinaryOperation2>
  T inner_product(InputIterator1 first1, InputIterator1 last1,
                  InputIterator2 first2, T init,
                  BinaryOperation1 binary_op1,
                  BinaryOperation2 binary_op2);
}
```

##概要
2つのシーケンスの任意の範囲の値の内積を計算する。


##パラメータ

| | |
|------------|---------------------------------------------------------|
| `first1` | 1つめのシーケンスの先頭 |
| `last1` | 1つめのシーケンスの終端 |
| `first2` | 2つめのシーケンスの先頭 |
| `init` | 初期値 |
| `binary_op1` | アキュームレータ |
| `binary_op2` | 2つのシーケンスの対になる要素への処理 |

##戻り値
シーケンスの値の型。


##計算量
最初のバージョンは n 回の加算処理と n 回の乗算処理を行う。 
2番目のバージョンは n 回の binary_op1 呼び出しと n 回の binary_op2 呼び出しを行う。 
（n は `last1-first1`）


##実装例
```cpp
template <class InputIterator1, class InputIterator2, class T>
T inner_product(InputIterator1 first1, InputIterator1 last1,
                InputIterator2 first2, T init) {
  while (first1 != last1)
    init = init + (*first1++ * *first2++);
  return init;
}
```

```cpp
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

##使用例

```cpp
#include <numeric>
#include <iostream>
#include <array>

int main(){
  typedef std::array<double, 5> t;
  typedef t::value_type u;
  const t 
    a = {.0,.2,.4,.6,.8},
    b = {.1,.3,.5,.7,.9};
  std::cout
    << std::inner_product(a.begin(), a.end(), b.begin(), .0) << "\n"
    << std::inner_product(a.begin(), a.end(), b.begin(), 100.0
      , [](const u& a, const u& b)->u{
        return a-b;
      }
      , [](const u& a, const u& b)->u{
        return a/b;
      })
    << std::endl;
}
```
* inner_product[color ff0000]

###出力
```
1.4
96.7873
```

##備考
C++03 では `binary_op1`, `binary_op2` で副作用を起こすことを禁止していたが、C++11 以降では、要素を書き換えることと、イテレータを無効にすること以外の操作は全て認められるようになった。

