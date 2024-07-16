# operator>
* list[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class T, class Allocator>
  bool operator>(const list<T, Allocator>& x,
                 const list<T, Allocator>& y); // (1) C++03
}
```

## 概要
`list`において、左辺が右辺より大きいかを判定する。


## 戻り値
`y < x`


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <list>

int main ()
{
  std::list<int> ls1 = {4, 5, 6};
  std::list<int> ls2 = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (ls1 > ls2) << std::endl;
}
```


### 出力
```
true
```


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
