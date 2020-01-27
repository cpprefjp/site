# crbegin
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crbegin() const noexcept;           // C++11
constexpr const_reverse_iterator crbegin() const noexcept; // C++17
```

## 概要
最後尾の要素を指す�み取り専用逆イテレータを取得する。

[`rbegin()`](rbegin.md)は非`const`な`array`オブジェクトに対して`reverse_iterator`を返し、`const`な`array`オブジェクトに対しては`const_reverse_iterator`を返すが、`crbegin()`は`const_reverse_iterator`を返すバージョンのみが提供されている。
アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


## 戻り値
最後尾の要素を指す�み取り専用逆イテレータ


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
  std::for_each(ar.crbegin(), ar.crend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* crbegin[color ff0000]


### 出力
```
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
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
