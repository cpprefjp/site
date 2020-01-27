# end
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
iterator end() noexcept;
const_iterator end() const noexcept;
```

## 概要
`multimap` コンテナの最後の要素の次を参照するイテレータを返す。


## 戻り値
コンテナの最後の要素の次を参照するイテレータ。 
`iterator` と `const_iterator` はいずれもメンバ型である。`multimap` クラステンプレートにおいて、これらは双方向イテレータである。


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不�な範囲となるだろう


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

  for( auto i = m.begin(); i != m.end() ; ++i ) {
    std::cout << i->first << " " << i->second << "\n";
  }

  return 0;
}
```
* end()[color ff0000]
* m.begin()[link begin.md]
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

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): 2.9, 3.0, 3.1, 3.2, 3.3
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`multimap::begin`](/reference/map/multimap/begin.md) | 先�を指すイテレータを取得する |
| [`multimap::cbegin`](/reference/map/multimap/cbegin.md) | 先�を指すconstイテレータを取得する |
| [`multimap::cend`](/reference/map/multimap/cend.md) | 末尾を指すconstイテレータを取得する |
| [`multimap::rbegin`](/reference/map/multimap/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`multimap::rend`](/reference/map/multimap/rend.md) | 先�を指す逆イテレータを取得する |
| [`multimap::crbegin`](/reference/map/multimap/rbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`multimap::crend`](/reference/map/multimap/rend.md) | 先�を指す逆constイテレータを取得する |
