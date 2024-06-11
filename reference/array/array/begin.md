# begin
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator begin() noexcept;                       // (1) C++11
constexpr iterator begin() noexcept;             // (1) C++17

const_iterator begin() const noexcept;           // (2) C++11
constexpr const_iterator begin() const noexcept; // (2) C++17
```

## 概要
先頭要素を指すイテレータを取得する。


## 戻り値
非`const`な文脈では`iterator`型で先頭要素へのイテレータを返し、
`const`な文脈では`const_iterator`型で先頭要素へのイテレータを返す。


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

  decltype(ar)::iterator i = ar.begin();
  decltype(ar)::const_iterator ci = car.begin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* begin[color ff0000]


### 出力
```
1
1
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
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
