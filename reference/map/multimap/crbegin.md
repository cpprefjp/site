# crbegin
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crbegin() const noexcept;
```

## 概要
`multimap` コンテナ内の末尾を指す逆イテレータを取得する。 
内部的に、`multimap` コンテナは各要素をキーの値に従って下位から上位へと並べており、従って `crbegin()` は最上位のキーにあたる値へのイテレータを返す。 
`crbegin()` は [`end()`](end.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


## 戻り値
反転したシーケンスの先頭を指す逆イテレータ。 
`const_reverse_iterator` はメンバ型である。`multimap` クラステンプレートにおいて、これらは逆双方向イテレータであり、`reverse_iterator<const_iterator>` と定義される。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> m;
  m.insert(std::make_pair(5, 'e'));
  m.insert(std::make_pair(2, 'b'));
  m.insert(std::make_pair(4, 'd'));
  m.insert(std::make_pair(1, 'a'));
  m.insert(std::make_pair(1, 'a'));

  std::multimap<int,char>::const_reverse_iterator i = m.crbegin();
  for( ; i != m.crend() ; ++i )
    std::cout << i->first << " " << i->second << std::endl;

  return 0;
}
```
* crbegin()[color ff0000]
* m.crend()[link crend.md]
* m.insert[link insert.md]

### 出力
```
5 e
4 d
2 b
1 a
1 a
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 関連項目
| 名前 | 説明 |
----------------------------------|-------------------------------------------|
| [`multimap::begin`](begin.md)   | 先頭を指すイテレータを取得する |
| [`multimap::end`](end.md)       | 末尾の次を指すイテレータを取得する |
| [`multimap::cbegin`](cbegin.md) | 先頭を指すconstイテレータを取得する |
| [`multimap::cend`](cend.md)     | 末尾の次を指すconstイテレータを取得する |
| [`multimap::rbegin`](rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`multimap::rend`](rend.md)     | 先頭の前を指す逆イテレータを取得する |
| [`multimap::crend`](crend.md)   | 先頭の前を指す逆constイテレータを取得する |
