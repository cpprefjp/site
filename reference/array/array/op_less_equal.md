# operator<=
* array[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class T, size_t N>
  bool operator<=(const array<T, N>& x, const array<T, N>& y);           // C++11

  template <class T, size_t N>
  constexpr bool operator<=(const array<T, N>& x, const array<T, N>& y); // C++20
}
```

## 概要
`array`において、左辺が右辺以下かを判定する。


## 戻り値
`!(x` [`>`](op_greater.md) `y)`


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <array>

int main ()
{
  std::array<int, 3> x = {1, 2, 3};
  std::array<int, 3> y = {4, 5, 6};

  if (x <= y) {
    std::cout << "less equal" << std::endl;
  }
  else {
    std::cout << "greater" << std::endl;
  }
}
```

### 出力
```
less equal
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified]


## 参照
- [P1023R0 `constexpr` comparison operators for `std::array`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1023r0.pdf)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
