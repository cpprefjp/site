# operator>=
* vector[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class T, class Allocator>
  bool operator>=(const vector<T, Allocator>& x,
                  const vector<T, Allocator>& y);           // (1) C++03

  template <class T, class Allocator>
  constexpr bool operator>=(const vector<T, Allocator>& x,
                            const vector<T, Allocator>& y); // (1) C++20
}
```

## 概要
`vector`において、左辺が右辺以上かを判定する。


## 戻り値
`!(x` [`<`](op_less.md) `y)`


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> v1 = {4, 5, 6};
  std::vector<int> v2 = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (v1 >= v2) << std::endl;
}
```

### 出力
```
true
```

## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
