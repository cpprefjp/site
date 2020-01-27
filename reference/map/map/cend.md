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
`map` コンテナの最後の要素の次を参照するイテレータを返す。


## 戻り値
コンテナの最後の要素の次を参照するイテレータ。 
`const_iterator` はいずれもメンバ型である。`map` クラステンプレートにおいて、これらは双方向イテレータである。


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
- [Clang](/implementation.md#clang): 3.0 3.1, 3.2, 3.3
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`map::begin`](/reference/map/map/begin.md) | 先�を指すイテレータを取得する |
| [`map::end`](/reference/map/map/end.md) | 末尾を指すイテレータを取得する |
| [`map::cbegin`](/reference/map/map/cbegin.md) | 先�を指すconstイテレータを取得する |
| [`map::rbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`map::rend`](/reference/map/map/rend.md) | 先�を指す逆イテレータを取得する |
| [`map::crbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`map::crend`](/reference/map/map/rend.md) | 先�を指す逆constイテレータを取得する |



