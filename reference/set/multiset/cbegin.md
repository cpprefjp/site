# cbegin
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cbegin() const noexcept;
```


## 概要
`multiset` コンテナの先頭要素を参照する読み取り専用イテレータを取得する。


## 戻り値
コンテナの先頭要素への読み取り専用イテレータ。


## 計算量
定数時間。


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
* cbegin()[color ff0000]
* c.cend()[link cend.md]

### 出力
```
1
1
2
```

## 関連項目

| 名前                       | 説明                             |
|----------------------------|----------------------------------|
| [`multiset::cend`](cend.md)     | 末尾の次を指す読み取り専用イテレータを取得する |
| [`multuset::rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`multiset::rend`](rend.md)     | 先頭の前を指す逆イテレータを取得する |

