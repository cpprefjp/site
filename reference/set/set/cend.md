# cend
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cend() const noexcept;
```

## 概要
`set` コンテナの最後の要素の次を参照する読み取り専用イテレータを返す。


## 戻り値
コンテナの最後の要素の次を参照する読み取り専用イテレータ。

`const_iterator` はメンバ型である。`set` クラステンプレートにおいて、これは双方向イテレータである。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <set>
#include <algorithm>

int main()
{
  std::set<int> c = {3, 1, 2};

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
2
3
```

## 関連項目

| 名前                    | 説明                             |
|-------------------------|----------------------------------|
| [`cbegin`](cbegin.md) | 先頭を指す読み取り専用イテレータを取得する |
| [`rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`rend`](rend.md)     | 先頭を指す逆イテレータを取得する |

