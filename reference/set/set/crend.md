# crend
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crend() const noexcept;
```


## 概要
`set` コンテナの先頭要素の前（これは反転シーケンスの末尾にあたる）を指す読み取り専用逆イテレータを返す。


## 戻り値
反転シーケンスの終端を指す読み取り専用逆イテレータ。

`const_reverse_iterator` はメンバ型である。`set` クラステンプレートにおいて、これは双方向イテレータであり、`reverse_iterator<const_iterator>` と定義される。


## 例
```cpp
#include <iostream>
#include <set>
#include <algorithm>

int main()
{
  std::set<int> c = {3, 1, 2};

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
3
2
1
```

## 関連項目

| 名前                    | 説明                         |
|-------------------------|------------------------------|
| [`crbegin`](rbegin.md) | 末尾を指す読み取り専用逆イテレータを返す |
| [`cbegin`](begin.md)   | 先頭を指す読み取り専用イテレータを返す   |
| [`cend`](end.md)       | 末尾を指す読み取り専用イテレータを返す   |

