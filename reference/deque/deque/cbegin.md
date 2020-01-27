# cbegin
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cbegin() const noexcept;
```

## 概要

先�の要素を指す�み取り専用イテレータを取得する。

[`begin()`](/reference/deque/deque/begin.md)は非`const`な`deque`オブジェクトに対して`iterator`を返し、`const`な`deque`オブジェクトに対しては`const_iterator`を返すが、`cbegin()`は`const_iterator`を返すバージョンのみが提供されている。

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
#include <deque>
#include <algorithm>

int main()
{
  std::deque<int> c = {1, 2, 3};

  // このアルゴリズム内ではcの書き換えを決して行わない
  std::for_each(c.cbegin(), c.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cbegin()[color ff0000]
* cend()[link cend.md]

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
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013

## 参照


