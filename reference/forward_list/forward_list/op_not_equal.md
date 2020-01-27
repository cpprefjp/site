# operator!=
* forward_list[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator!=(const forward_list<T, Allocator>& x, const forward_list<T, Allocator>& y);
}
```

## 概要
`forward_list`オブジェクトの非�値比較を行う。


## 要件
型`T`が`operator==`で比較可能であること。


## 戻り値
`!(x == y)`


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <forward_list>

int main ()
{
  std::forward_list<int> ls1 = {1, 2, 3};
  std::forward_list<int> ls2 = {1, 2, 3};
  std::forward_list<int> ls3 = {1, 2, 3, 4};

  std::cout << std::boolalpha;

  // 要素数と要素の値が�しい
  std::cout << (ls1 != ls2) << std::endl;

  // 要素の値は(左辺の要素数分まで)�しいが要素数が異なる
  std::cout << (ls1 != ls3) << std::endl;

}
```

### 出力
```
false
true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 参照


