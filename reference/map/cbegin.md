#cbegin(C++11)
```cpp
const_iterator cbegin() const noexcept;
```


##概要
`map` コンテナの先頭のキーと要素のpairを参照するイテレータを返す。 
内部的に、`map`コンテナは要素を下位から上位へと並べており、従って `cbegin()` は `map` 内の最下位のキーにあたるpairのイテレータを返す。


##戻り値
コンテナの先頭要素へのイテレータ。
`const_iterator` はメンバ型である。`map` クラステンプレートにおいて、これらは双方向イテレータである。


##計算量
定数時間。


##例
```cpp
#include <iostream>
#include <map>

using namespace std;

int main() 
{
  map<int, char> c;
  c[3] = 'C';
  c[7] = 'G';
  c[8] = 'H';
  c[4] = 'D';
  c[5] = 'E';
  c[1] = 'A';
  c[2] = 'B';
  c[6] = 'F';
  
  for( auto i = c.cbegin(); i != c.cend() ; ++i ) {
	cout << i->first << " " << i->second << "\n";
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

###処理系
- [Clang](/implementation#clang.md): 3.0, 3.1, 3.2, 3.3
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??


##参照

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`map::begin`](/reference/map/begin.md) | 先頭を指すイテレータを取得する |
| [`map::end`](/reference/map/end.md) | 末尾を指すイテレータを取得する |
| [`map::cend`](/reference/map/cend.md) | 末尾を指すconstイテレータを取得する |
| [`map::rbegin`](/reference/map/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`map::rend`](/reference/map/rend.md) | 先頭を指す逆イテレータを取得する |
| [`map::crbegin`](/reference/map/rbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`map::crend`](/reference/map/rend.md) | 先頭を指す逆constイテレータを取得する |





