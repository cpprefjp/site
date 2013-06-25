#begin, cbegin
```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;

// since C++11
const_iterator cbegin() const noexcept;
```


##概要
`map` コンテナの先頭要素を参照するイテレータを返す。 
内部的に、`map`コンテナは要素を下位から上位へと並べており、従って `begin()`, `cbegin()` は `map` 内の最下位のキーにあたる値を返す。


##戻り値
コンテナの先頭要素へのイテレータ。
`iterator` と `const_iterator` はともにメンバ型である。`map` クラステンプレートにおいて、これらは双方向イテレータである。


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
  
  for( auto i = c.begin(); i != c.end() ; ++i ) {
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

##参照

| | |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`map::end, cend`](/reference/map/end.md) | 末尾を指すイテレータを取得する |
| [`map::rbegin, crbegin`](/reference/map/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`map::rend, crend`](/reference/map/rend.md) | 先頭を指す逆イテレータを取得する |


