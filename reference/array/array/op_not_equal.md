# operator!=
* array[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, size_t N>
  bool operator!=(const array<T, N>& x, const array<T, N>& y);           // C++11

  template <class T, size_t N>
  constexpr bool operator!=(const array<T, N>& x, const array<T, N>& y); // C++20
}
```

## 概要
`array`オブジェクトの非�値比較を行う


## 要件
`array`の要素型`T`が`operator==`で比較可能であること。


## 戻り値
`!(x` [`==`](op_equal.md) `y)`


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> x = {1, 2, 3};
  std::array<int, 3> y = {1, 2, 3};

  if (x != y) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```

### 出力
```
equal
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012


## 参照
- [P1023R0 `constexpr` comparison operators for `std::array`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1023r0.pdf)
