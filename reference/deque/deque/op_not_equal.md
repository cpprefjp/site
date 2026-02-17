# operator!=
* deque[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template <class T, class Allocator>
  bool
    operator!=(const deque<T, Allocator>& x,
               const deque<T, Allocator>& y); // (1) C++03
  template <class T, class Allocator>
  constexpr bool
    operator!=(const deque<T, Allocator>& x,
               const deque<T, Allocator>& y); // (1) C++26
}
```

## 概要
`deque`の非等値比較を行う。


## 要件
型`T`が`operator==`で比較可能であること。


## 戻り値
`!(x` [`==`](op_equal.md) `y)`


## 計算量
`x.`[`size()`](size.md)に対して線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 例
```cpp example
#include <iostream>
#include <deque>

int main ()
{
  std::deque<int> c1 = {1, 2, 3};
  std::deque<int> c2 = {1, 2, 3};
  std::deque<int> c3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (c1 != c2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (c1 != c3) << std::endl;
}
```

### 出力
```
false
true
```

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
