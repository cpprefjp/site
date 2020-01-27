# crbegin
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crbegin() const noexcept;
```


## 概要
`multiset` コンテナ内の最後の要素を指す、�み取り専用逆イテレータを返す。


## 戻り値
反転したシーケンスの先�を指す、�み取り専用逆イテレータ。

`const_reverse_iterator` はメンバ型である。`multiset` クラステンプレートにおいて、これは双方向イテレータであり、`reverse_iterator<const_iterator>` と定義される。


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
  std::for_each(c.crbegin(), c.crend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* crbegin()[color ff0000]
* crend()[link crend.md]

### 出力
```
2
1
1
```

## 関連項目

| 名前                    | 説明                             |
|-------------------------|----------------------------------|
| [`crend`](crend.md)   | 先�を指す�み取り専用逆イテレータを取得する |
| [`cbegin`](cbegin.md) | 先�を指す�み取り専用イテレータを取得する   |
| [`cend`](cend.md)     | 末尾を指す�み取り専用イテレータを取得する   |

