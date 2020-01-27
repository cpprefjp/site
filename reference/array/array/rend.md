# rend
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
reverse_iterator rend() noexcept;                       // (1) C++11
constexpr reverse_iterator rend() noexcept;             // (1) C++17

const_reverse_iterator rend() const noexcept;           // (2) C++11
constexpr const_reverse_iterator rend() const noexcept; // (2) C++17
```

## 概要
先�要素の前を指す逆イテレータを取得する。


## 戻り値
非`const`な文脈では`reverse_iterator`型で先�要素の前を指す逆イテレータを返し、
`const`な文脈では`const_reverse_iterator`型で 先�要素の前を指す逆イテレータを返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};
  const std::array<int, 3>& car = ar;

  decltype(ar)::reverse_iterator i = ar.rbegin();
  decltype(ar)::reverse_iterator last = ar.rend();

  decltype(ar)::const_reverse_iterator ci = car.rbegin();
  decltype(ar)::const_reverse_iterator clast = car.rend();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* rend[color ff0000]


### 出力
```
3
2
1
3
2
1
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
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
