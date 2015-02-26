#cend (C++11)
* map[meta header]
* std[meta namespace]

```cpp
// since C++11
const_iterator cend() const noexcept;
```

##概要
`map` コンテナの最後の要素の次を参照するイテレータを返す。


##戻り値
コンテナの最後の要素の次を参照するイテレータ。 
`const_iterator` はいずれもメンバ型である。`map` クラステンプレートにおいて、これらは双方向イテレータである。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> c;
  c[3] = 'C';
  c[7] = 'G';
  c[8] = 'H';
  c[4] = 'D';
  c[5] = 'E';
  c[1] = 'A';
  c[2] = 'B';
  c[6] = 'F';

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
| [`map::begin`](/reference/map/map/begin.md) | 先頭を指すイテレータを取得する |
| [`map::end`](/reference/map/map/end.md) | 末尾を指すイテレータを取得する |
| [`map::cbegin`](/reference/map/map/cbegin.md) | 先頭を指すconstイテレータを取得する |
| [`map::rbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`map::rend`](/reference/map/map/rend.md) | 先頭を指す逆イテレータを取得する |
| [`map::crbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`map::crend`](/reference/map/map/rend.md) | 先頭を指す逆constイテレータを取得する |



