# end
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator end() noexcept;                       // (1) C++11
constexpr iterator end() noexcept;             // (1) C++17

const_iterator end() const noexcept;           // (2) C++11
constexpr const_iterator end() const noexcept; // (2) C++17
```

## 概要
末尾の次を指すイテレータを取得する。


## 戻り値
非`const`な文脈では`iterator`型で最後尾要素の次を指すイテレータを返し、
`const`な文脈では`const_iterator`型で 最後尾要素の次を指すイテレータを返す。


## 例外
投げない


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不�な範囲となるだろう


## 例
```cpp example
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};
  const std::array<int, 3>& car = ar;

  decltype(ar)::iterator i = ar.begin();
  decltype(ar)::iterator last = ar.end();

  decltype(ar)::const_iterator ci = car.begin();
  decltype(ar)::const_iterator clast = car.end();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* end[color ff0000]


### 出力
```
1
2
3
1
2
3
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
