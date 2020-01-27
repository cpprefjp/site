# cbegin
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cbegin() const noexcept;           // C++11
constexpr const_iterator cbegin() const noexcept; // C++17
```

## 概要
先�の要素を指す�み取り専用イテレータを取得する。

[`begin()`](begin.md)は非`const`な`array`オブジェクトに対して`iterator`を返し、`const`な`array`オブジェクトに対しては`const_iterator`を返すが、`cbegin()`は`const_iterator`を返すバージョンのみが提供されている。
アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


## 戻り値
先�の要素を指す�み取り専用イテレータ


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <array>
#include <algorithm>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};

  // このアルゴリズム内ではarの書き換えを決して行わない
  std::for_each(ar.cbegin(), ar.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cbegin[color ff0000]


### 出力
```
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
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
