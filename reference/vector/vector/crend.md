# crend
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crend() const noexcept;
```

## 概要
先�要素の前を指す�み取り専用逆イテレータを取得する。

[`rend`](rend.md)`()`は非`const`な`vector`オブジェクトに対して`reverse_iterator`を返し、`const`な`vector`オブジェクトに対しては`const_reverse_iterator`を返すが、`cend()`は`const_reverse_iterator`を返すバージョンのみが提供されている。

アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


## 戻り値
先�要素の前を指す�み取り専用逆イテレータ


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
  std::for_each(v.crbegin(), v.crend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* crend()[color ff0000]
* v.crbegin()[link crbegin.md]

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
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013

