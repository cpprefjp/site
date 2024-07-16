# cbegin
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cbegin() const noexcept;           // (1) C++11
constexpr const_iterator cbegin() const noexcept; // (1) C++20
```

## 概要
先頭の要素を指す読み取り専用イテレータを取得する。

[`begin`](begin.md)`()`は非`const`な`vector`オブジェクトに対して`iterator`を返し、`const`な`vector`オブジェクトに対しては`const_iterator`を返すが、`cbegin()`は`const_iterator`を返すバージョンのみが提供されている。

アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


## 戻り値
先頭の要素を指す読み取り専用イテレータ


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3};

  // このアルゴリズム内ではvの書き換えを決して行わない
  std::for_each(v.cbegin(), v.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cbegin()[color ff0000]
* v.cend()[link cend.md]

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
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
