# cend
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cend() const noexcept;           // (1) C++11
constexpr const_iterator cend() const noexcept; // (1) C++26
```

## 概要
`multimap` コンテナの末尾の次を参照するイテレータを取得する。


## 戻り値
コンテナの末尾の次を参照するイテレータ。 
`const_iterator` はメンバ型である。`multimap` クラステンプレートにおいて、この型は双方向イテレータである。


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不正な範囲となるだろう


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
* cend()[color ff0000]
* m.cbegin()[link cbegin.md]
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
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

| 名前 | 説明 |
|-----------------------------------|-------------------------------------------|
| [`multimap::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`multimap::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`multimap::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`multimap::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`multimap::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`multimap::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`multimap::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
