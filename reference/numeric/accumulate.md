#accumulate
```cpp
namespace std{
  template <class InputIterator, class T>
  T accumulate(InputIterator first, InputIterator last, T init);

  template <class InputIterator, class T, class BinaryOperation>
  T accumulate(InputIterator first, InputIterator last, T init,
               BinaryOperation binary_op);
}
```

##概要

1つのシーケンスの任意の範囲の値を足し合わせる。

##パラメータ

| | |
|-----------|--------------------------|
| first | シーケンスの先頭 |
| last | シーケンスの終端 |
| init | 初期値 |
| binary_op | アキュームレータ |

##戻り値

シーケンスの値の型。


##計算量
Ο(n)


##実装例


```cpp
template <class InputIterator, class T>
T accumulate(InputIterator first, InputIterator last, T init) {
  while (first != last)
    init = init + *first++;
  return init;
}
```

```cpp
template <class InputIterator, class T, class BinaryOperation>
T accumulate(InputIterator first, InputIterator last, T init,
             BinaryOperation binary_op) {
  while (first != last)
    init = binary_op(init, *first++);
  return init;
}
```

##例
```cpp
#include <numeric>
#include <iostream>
#include <array>

int main(){
  typedef std::array<double, 5> t;
  typedef t::value_type u;
  const t a = {.0,0.2,0.4,0.6,0.8};
  std::cout
    << std::accumulate(a.begin(), a.end(), .0) << "\n"
    << std::accumulate(a.begin(), a.end(), 100.0
      , [](const u& a, const u& b)->u{
        return a+b*b;
      })
    << std::endl;
}
```
* std::accumulate[color ff0000]

###出力
```
2
101.2
```

##備考

C++03 の場合、binary_op で副作用を起こすことを禁止していた。これについては Effective STL 第37項で以下のように書かれている。

(後で引用する)

C++11 以降では、要素を書き換えることと、イテレータを無効にすること以外の操作は全て認められるようになっている。

つまり Effective STL 第37項に載っているような例を、何の問題も無く使用することができるようになっている。
