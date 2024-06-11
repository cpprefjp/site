# operator<
* forward_list[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class T, class Allocator>
  bool operator<(const forward_list<T, Allocator>& x,
                 const forward_list<T, Allocator>& y); // (1) C++11
}
```

## 概要
`forward_list`において、左辺が右辺より小さいかの判定を行う。



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
要素数に対して線形時間。


## 例
```cpp example
#include <iostream>
#include <forward_list>

int main ()
{
  std::forward_list<int> ls1 = {1, 2, 3};
  std::forward_list<int> ls2 = {4, 5, 6};

  std::cout << std::boolalpha;

  std::cout << (ls1 < ls2) << std::endl;
}
```

### 出力
```
true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
