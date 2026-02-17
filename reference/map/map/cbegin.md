# cbegin
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cbegin() const noexcept;           // (1) C++11
constexpr const_iterator cbegin() const noexcept; // (1) C++26
```


## 概要
`map` コンテナの先頭のキーと要素のpairを参照するイテレータを取得する。 
内部的に、`map`コンテナは要素を下位から上位へと並べており、従って `cbegin()` は `map` 内の最下位のキーにあたるpairへのイテレータを返す。


## 戻り値
コンテナの先頭要素へのイテレータ。
`const_iterator` はメンバ型である。`map` クラステンプレートにおいて、これらは双方向イテレータである。


## 計算量
定数時間。


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
* cbegin()[color ff0000]
* m.cend()[link cend.md]

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

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前 | 説明 |
|------------------------------|-------------------------------------------|
| [`map::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`map::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`map::cend`](cend.md)       | 末尾の次を指すconstイテレータを取得する |
| [`map::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`map::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`map::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`map::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
