# operator!=
* vector[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template <class T, class Allocator>
  bool operator!=(const vector<T, Allocator>& x,
                  const vector<T, Allocator>& y);           // (1) C++03

  template <class T, class Allocator>
  constexpr bool operator!=(const vector<T, Allocator>& x,
                            const vector<T, Allocator>& y); // (1) C++20
}
```

## 概要
`vector`の非等値比較を行う。


## 要件
型`T`が`operator==`で比較可能であること。


## 戻り値
`!(x` [`==`](op_equal.md) `y)`


## 計算量
線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {1, 2, 3};
  std::vector<int> v3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が等しい
  std::cout << (v1 != v2) << std::endl;

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  std::cout << (v1 != v3) << std::endl;
}
```

#### 出力
```
false
true
```


### 基本的な使い方 (C++20 constexpr)
```cpp
#include <cassert>
#include <vector>

constexpr bool f()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {1, 2, 3};
  std::vector<int> v3 = {1, 2, 3, 4};

  // 要素の値は(左辺の要素数分まで)等しいが要素数が異なる
  assert(v1 != v3);

  // 要素数と要素の値が等しい
  assert(!(v1 != v2));

  return true;
}

int main()
{
  static_assert(f());
}
```

## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
