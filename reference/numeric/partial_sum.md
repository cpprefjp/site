#partial_sum
* numeric[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
    OutputIterator partial_sum(
      InputIterator first, InputIterator last,
      OutputIterator result);

  template <class InputIterator, class OutputIterator, class BinaryOperation>
      OutputIterator partial_sum(
        InputIterator first, InputIterator last,
        OutputIterator result, BinaryOperation binary_op);
}
```

##概要
1つのシーケンスの任意の範囲の値の部分和を計算する。

[`accumulate`](./accumulate.md)`()`は最終結果のみを得るが、`partial_sum()`は計算の途中結果のシーケンスを得る。


##パラメータ

| パラメータ名 | 説明 |
|-----------|-----------------------------------------------------|
| `first` | シーケンスの先頭 |
| `last` | シーケンスの終端 |
| `result` | 計算結果を出力するシーケンスの先頭 |
| `binary_op` | 部分和を求める処理 |


##戻り値
`result + (last - first)`


##計算量
Ο(2n)


##備考
この関数は、他の言語では`scan`という名前で提供されている。


##例
```cpp
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
  const std::array<double, 5> a = {.0,.2,.4,.6,.8};

  {
    std::array<double, 5> result;
    std::partial_sum(a.begin(), a.end(), result.begin());
    print(result);
  }

  {
    std::array<double, 5> result;
    std::partial_sum(a.begin(), a.end(), result.begin(),
                       [](double a, double b) { return 2 * a - b; });
    print(result);
  }
}
```
* partial_sum[color ff0000]

###出力
```cpp
0 --> 0.2 --> 0.6 --> 1.2 --> 2 --> end
0 --> -0.2 --> -0.8 --> -2.2 --> -5.2 --> end
```


