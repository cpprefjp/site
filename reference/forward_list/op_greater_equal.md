# operator>=
* forward_list[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator>=(const forward_list<T, Allocator>& x, const forward_list<T, Allocator>& y);
}
```

## 概要
`forward_list`において、左辺が右辺以上かを判定する。


## 戻り値
`!(a < b)`


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <forward_list>

int main ()
{
  std::forward_list<int> ls1 = {4, 5, 6};
  std::forward_list<int> ls2 = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (ls1 >= ls2) << std::endl;
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
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1


## 参照


