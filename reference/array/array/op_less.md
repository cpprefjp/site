# operator<
* array[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class T, size_t N>
  bool operator<(const array<T, N>& x, const array<T, N>& y);           // C++11

  template <class T, size_t N>
  constexpr bool operator<(const array<T, N>& x, const array<T, N>& y); // C++20
}
```

## 概要
`array`において、左辺が右辺より小さいかの判定を行う。


## 要件
型`T`が`<`比較可能であること。その`<`が全順序関係を持っていること。


## 戻り値
```cpp
lexicographical_compare(x.begin(), x.end(), y.begin(), y.end());
```
* lexicographical_compare[link /reference/algorithm/lexicographical_compare.md]
* begin()[link begin.md]
* end()[link end.md]


## 計算量
[`size()`](size.md) に対して線形時間。


## 例
```cpp example
#include <iostream>
#include <array>

int main ()
{
  std::array<int, 3> x = {1, 2, 3};
  std::array<int, 3> y = {4, 5, 6};

  if (x < y) {
    std::cout << "less" << std::endl;
  }
  else {
    std::cout << "greater equal" << std::endl;
  }
}
```

### 出力
```
less
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
