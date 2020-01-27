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
`multimap` コンテナの先�の�ーと要素のpairを参照するイテレータを返す。 
内部的に、`multimap`コンテナは要素を下位から上位へと並べており、従って `cbegin()` は `multimap` 内の最下位の�ーにあたるpairのイテレータを返す。


## 戻り値
コンテナの先�要素へのイテレータ。
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
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`multimap::begin`](/reference/map/multimap/begin.md) | 先�を指すイテレータを取得する |
| [`multimap::end`](/reference/map/multimap/end.md) | 末尾を指すイテレータを取得する |
| [`multimap::cend`](/reference/map/multimap/cend.md) | 末尾を指すconstイテレータを取得する |
| [`multimap::rbegin`](/reference/map/multimap/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`multimap::rend`](/reference/map/multimap/rend.md) | 先�を指す逆イテレータを取得する |
| [`multimap::crbegin`](/reference/map/multimap/rbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`multimap::crend`](/reference/map/multimap/rend.md) | 先�を指す逆constイテレータを取得する |





