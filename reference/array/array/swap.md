# swap
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(array& other)
         noexcept(noexcept(swap(declval<T&>(), declval<T&>()))); // C++11

constexpr void swap(array& other)
         noexcept(noexcept(swap(declval<T&>(), declval<T&>()))); // C++20
```

## 概要
自身と他の`array`オブジェクトの値を入れ替える


## 効果
[`swap_ranges`](/reference/algorithm/swap_ranges.md)`(`[`begin`](begin.md)`(),` [`end`](end.md)`(), other.`[`begin`](begin.md)`())`


## 戻り値
なし


## 例外
`array`クラスの要素型`T`に対する`swap`操作が例外を投げない場合、この`swap`関数は決して例外を投げない。


## 計算量
線形時間


## 備考
`0`要素の場合(`N == 0`)、`noexcept(true)`となる。


## 例
```cpp example
#include <iostream>
#include <array>

#include <string>
#include <algorithm> // std::for_each

template <class T, std::size_t N>
void print(const std::string& name, const std::array<T, N>& ar)
{
  std::cout << name << " : ";
  std::for_each(ar.begin(), ar.end(), [](const T& x) {
    std::cout << x << ' ';
  });
  std::cout << std::endl;
}

int main()
{
  std::array<int, 3> x = {1, 2, 3};
  std::array<int, 3> y = {4, 5, 6};

  x.swap(y);

  print("x", x);
  print("y", y);
}
```
* swap[color ff0000]


### 出力
```
x : 4 5 6 
y : 1 2 3 
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
- [P1032R1 Misc constexpr bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
