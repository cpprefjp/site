# crend
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crend() const noexcept;
```


## 概要
`multiset` コンテナの先頭要素の前（これは反転シーケンスの末尾にあたる）を指す読み取り専用逆イテレータを取得する。


## 戻り値
反転シーケンスの終端を指す読み取り専用逆イテレータ。

`const_reverse_iterator` はメンバ型である。`multiset` クラステンプレートにおいて、これは双方向イテレータであり、`reverse_iterator<const_iterator>` と定義される。


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
* crend()[color ff0000]
* crbegin()[link crbegin.md]

### 出力
```
2
1
1
```

## 関連項目

| 名前                    | 説明                         |
|-------------------------|------------------------------|
| [`crbegin`](crbegin.md) | 末尾を指す読み取り専用逆イテレータを返す |
| [`cbegin`](cbegin.md)   | 先頭を指す読み取り専用イテレータを返す   |
| [`cend`](cend.md)       | 末尾の次を指す読み取り専用イテレータを返す   |

