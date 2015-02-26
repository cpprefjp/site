#begin
* map[meta header]

```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```


##概要
`multimap` コンテナの先頭のキーと要素のpairを参照するイテレータを返す。 
内部的に、`multimap`コンテナは要素を下位から上位へと並べており、従って `begin()`は `multimap` 内の最下位のキーにあたるpairのイテレータを返す。


##戻り値
コンテナの先頭要素へのイテレータ。
`iterator` と `const_iterator` はともにメンバ型である。`multimap` クラステンプレートにおいて、これらは双方向イテレータである。


##計算量
定数時間。


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
- C++03

###処理系
- [Clang](/implementation.md#clang): 2.9, 3.0, 3.1, 3.2, 3.3
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`multimap::end`](/reference/map/multimap/end.md) | 末尾を指すイテレータを取得する |
| [`multimap::cbegin`](/reference/map/multimap/cbegin.md) | 先頭を指すconstイテレータを取得する |
| [`multimap::cend`](/reference/map/multimap/cend.md) | 末尾を指すconstイテレータを取得する |
| [`multimap::rbegin`](/reference/map/multimap/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`multimap::rend`](/reference/map/multimap/rend.md) | 先頭を指す逆イテレータを取得する |
| [`multimap::crbegin`](/reference/map/multimap/rbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`multimap::crend`](/reference/map/multimap/rend.md) | 先頭を指す逆constイテレータを取得する |


