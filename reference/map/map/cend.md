# cend
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cend() const noexcept;
```

## 概要
`map` コンテナの末尾の次を参照するイテレータを取得する。


## 戻り値
コンテナの末尾の次を参照するイテレータ。 
`const_iterator` はメンバ型である。`map` クラステンプレートにおいて、この型は双方向イテレータである。


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
  std::map<int, char> m;
  m[3] = 'C';
  m[7] = 'G';
  m[8] = 'H';
  m[4] = 'D';
  m[5] = 'E';
  m[1] = 'A';
  m[2] = 'B';
  m[6] = 'F';

  for( auto i = m.cbegin(); i != m.cend() ; ++i ) {
      std::cout << i->first << " " << i->second << "\n";
  }

  return 0;
}
```
* cend()[color ff0000]
* m.cbegin()[link cbegin.md]

### 出力
```
1 A
2 B
3 C
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
|------------------------------|-------------------------------------------|
| [`map::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`map::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`map::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`map::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`map::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`map::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`map::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |



