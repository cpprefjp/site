#cend (C++11)
* map[meta header]
* std[meta namespace]

```cpp
// since C++11
const_iterator cend() const noexcept;
```

##概要
`multimap` コンテナの最後の要素の次を参照するイテレータを返す。


##戻り値
コンテナの最後の要素の次を参照するイテレータ。 
`const_iterator` はいずれもメンバ型である。`multimap` クラステンプレートにおいて、これらは双方向イテレータである。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> c;
  c.insert( std::make_pair(3,'C'));
  c.insert( std::make_pair(3,'D'));
  c.insert( std::make_pair(7,'G'));
  c.insert( std::make_pair(8,'H'));
  c.insert( std::make_pair(4,'D'));
  c.insert( std::make_pair(5,'E'));
  c.insert( std::make_pair(1,'A'));
  c.insert( std::make_pair(2,'B'));
  c.insert( std::make_pair(6,'F'));

  for( auto i = c.begin(); i != c.end() ; ++i ) {
    std::cout << i->first << " " << i->second << "\n";
  }

  return 0;
}
```

###出力
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

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0 3.1, 3.2, 3.3
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

##参照

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`multimap::begin`](/reference/map/multimap/begin.md) | 先頭を指すイテレータを取得する |
| [`multimap::end`](/reference/map/multimap/end.md) | 末尾を指すイテレータを取得する |
| [`multimap::cbegin`](/reference/map/multimap/cbegin.md) | 先頭を指すconstイテレータを取得する |
| [`multimap::rbegin`](/reference/map/multimap/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`multimap::rend`](/reference/map/multimap/rend.md) | 先頭を指す逆イテレータを取得する |
| [`multimap::crbegin`](/reference/map/multimap/rbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`multimap::crend`](/reference/map/multimap/rend.md) | 先頭を指す逆constイテレータを取得する |



