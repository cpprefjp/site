#adjacent_difference
```cpp
namespace std{
  template <class InputIterator, class OutputIterator>
    OutputIterator adjacent_difference(
      InputIterator first, InputIterator last,
      OutputIterator result);

  template <class InputIterator, class OutputIterator, class BinaryOperation>
    OutputIterator adjacent_difference(
      InputIterator first, InputIterator last,
      OutputIterator result,
      BinaryOperation binary_op);
}
```

##概要
1つのシーケンスの任意の範囲の隣接する値間の差を計算する。


##パラメータ

| | |
|-----------|-----------------------------------------------------|
| `first` | シーケンスの先頭 |
| `last` | シーケンスの終端 |
| `result` | 計算結果を出力するシーケンスの先頭 |
| `binary_op` | 差を求める処理 |


##戻り値
シーケンスの型。


##計算量
Ο(2n)


##例
```cpp
#include <numeric>
#include <iostream>
#include <array>

int main(){
  typedef std::array<double, 5> t;
  typedef t::value_type u;
  const t a = {.0,.2,.4,.6,.8};
  t r;

  auto o = [](const t& vs){
    for(const auto& v: vs)
      std::cout << v << " --> ";
    std::cout << "end" << std::endl;
  };

  std::adjacent_difference(a.begin(), a.end(), r.begin());
  o(r);

  std::adjacent_difference(a.begin(), a.end(), r.begin(),
    [](const u& a, const u& b)->u{
      return a*a-b*b;
    });
  o(r);
}
```
* std::adjacent_difference[color ff0000]

###出力
```cpp
0 --> 0.2 --> 0.2 --> 0.2 --> 0.2 --> end
0 --> 0.04 --> 0.12 --> 0.2 --> 0.28 --> end
```

