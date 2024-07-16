# operator[]
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
reference operator[](size_type n);                       // (1) C++11
constexpr reference operator[](size_type n);             // (1) C++17

const_reference operator[](size_type n) const;           // (2) C++11
constexpr const_reference operator[](size_type n) const; // (2) C++14
```

## 概要
n番目の要素を参照する。


## 戻り値
`a[n]` は`n`番目の要素への参照を返す。`a`が`const`である場合には`const`参照を返す。


## 計算量
定数時間


## 備考
`a[n]` と `*(a.`[`begin()`](begin.md) `+ n)` は同じ結果になる。


## 例
```cpp example
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {3, 1, 4};
  const std::array<int, 3>& car = ar;

  int& a = ar[2];
  const int& b = car[2];

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* [2][color ff0000]


### 出力
```
4
4
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
- [N3470 Constexpr Library Additions: containers, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3470.html)
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
