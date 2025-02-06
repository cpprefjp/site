# cbegin
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_iterator cbegin() const noexcept;
```


## 概要
コンテナの先頭要素を参照するイテレータを取得する。

内部的に、コンテナは要素を下位から上位へと並べており、従って`cbegin()`はコンテナ内の最下位のキーにあたる値へのイテレータを返す。


## 戻り値
コンテナの先頭要素へのイテレータ。
`const_iterator` はメンバ型である。このクラステンプレートにおいて、この型はランダムアクセスイテレータである。


## 計算量
定数時間。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_multiset<int> fs = {3, 1, 4, 1};

  for (auto i = fs.cbegin(); i != fs.cend(); ++i) {
    std::cout << *i << std::endl;
  }
}
```
* cbegin()[color ff0000]
* fs.cend()[link cend.md]

### 出力
```
1
1
3
4
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|-----------------------------------|--------------------------------|
| [`flat_multiset::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_multiset::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_multiset::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`flat_multiset::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`flat_multiset::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_multiset::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_multiset::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |
