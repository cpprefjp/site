# cend
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cend() const noexcept;
```

## 概要
`multiset` コンテナの末尾の次を参照する読み取り専用イテレータを取得する。


## 戻り値
コンテナの末尾の次を参照する読み取り専用イテレータ。

`const_iterator` はメンバ型である。`multiset` クラステンプレートにおいて、これは双方向イテレータである。


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不正な範囲となるだろう


## 例
```cpp example
#include <iostream>
#include <set>
#include <algorithm>

int main()
{
  std::multiset<int> c = {1, 1, 2};

  // このアルゴリズム内ではcの書き換えを決して行わない
  std::for_each(c.cbegin(), c.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cend()[color ff0000]
* cbegin()[link cbegin.md]

### 出力
```
1
1
2
```

## 関連項目

| 名前                    | 説明                             |
|-------------------------|----------------------------------|
| [`cbegin`](cbegin.md) | 先頭を指す読み取り専用イテレータを取得する |
| [`rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`rend`](rend.md)     | 先頭の前を指す逆イテレータを取得する |
