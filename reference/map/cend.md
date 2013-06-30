#cend
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
}```

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
- [Clang](/implementation#clang.md): 3.0 3.1, 3.2, 3.3
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

##参照

| 名前 | 説明 |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`begin`](./begin.md) | 先頭を指すイテレータを取得する |
| [`cbegin`](./cbegin.md) | 先頭を指すconstイテレータを取得する |
| [`rbegin, crbegin`](./rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`rend, crend`](./rend.md) | 先頭を指す逆イテレータを取得する |


