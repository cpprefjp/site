# cend
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cend() const noexcept;           // (1) C++11
constexpr const_iterator cend() const noexcept; // (1) C++20
```

## 概要
末尾要素の次を指す読み取り専用イテレータを取得する。

[`end`](end.md)`()`は非`const`な`vector`オブジェクトに対して`iterator`を返し、`const`な`vector`オブジェクトに対しては`const_iterator`を返すが、`cend()`は`const_iterator`を返すバージョンのみが提供されている。

アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


## 戻り値
末尾要素の次を指す読み取り専用イテレータ


## 例外
投げない


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不正な範囲となるだろう


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
* cend()[color ff0000]
* v.cbegin()[link cbegin.md]

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
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
