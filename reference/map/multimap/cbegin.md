# cbegin
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cbegin() const noexcept;
```

## 概要
`multimap` コンテナの先頭のキーと要素のpairを参照するイテレータを取得する。 
内部的に、`multimap`コンテナは要素を下位から上位へと並べており、従って `cbegin()` は `multimap` 内の最下位のキーにあたるpairへのイテレータを返す。


## 戻り値
コンテナの先頭要素へのイテレータ。
`const_iterator` はメンバ型である。`multimap` クラステンプレートにおいて、これらは双方向イテレータである。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> m;
  m.insert(std::make_pair(3, 'C'));
  m.insert(std::make_pair(3, 'D'));
  m.insert(std::make_pair(7, 'G'));
  m.insert(std::make_pair(8, 'H'));
  m.insert(std::make_pair(4, 'D'));
  m.insert(std::make_pair(5, 'E'));
  m.insert(std::make_pair(1, 'A'));
  m.insert(std::make_pair(2, 'B'));
  m.insert(std::make_pair(6, 'F'));

  for( auto i = m.cbegin(); i != m.cend() ; ++i ) {
    std::cout << i->first << " " << i->second << "\n";
  }

  return 0;
}
```
* cbegin()[color ff0000]
* m.cend()[link cend.md]
* m.insert[link insert.md]

### 出力
```
1 A
2 B
3 C
3 D
4 D
5 E
6 F
7 G
8 H
```

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|-----------------------------------|-------------------------------------------|
| [`multimap::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`multimap::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`multimap::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`multimap::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`multimap::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`multimap::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`multimap::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |
