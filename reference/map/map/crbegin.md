#crbegin (C++11)
```cpp
const_reverse_iterator crbegin() const noexcept;
```

##概要
`map` コンテナ内の最後の要素を指す逆イテレータを返す。 
内部的に、`map` コンテナは各要素をキーの値に従って下位から上位へと並べており、従って `crbegin()` は最上位のキーにあたる値を返す。 
`crbegin()` は [`end()`](/reference/map/map/end.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


##戻り値
反転したシーケンスの先頭を指す逆イテレータ。 
`const_reverse_iterator` はメンバ型である。`map` クラステンプレートにおいて、これらは逆双方向イテレータであり、`reverse_iterator<const_iterator>` と定義される。


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
  c.insert(std::make_pair(5, 'e'));
  c.insert(std::make_pair(2, 'b'));
  c.insert(std::make_pair(4, 'd'));
  c.insert(std::make_pair(1, 'a'));
  c.insert(std::make_pair(1, 'a'));

  map<int,char>::const_reverse_iterator i = c.crbegin();
  for( ; i != c.crend() ; ++i )
    cout << i->first << " " << i->second << endl;

  return 0;
}
```

###出力
```
5 e
4 d
2 b
1 a
```

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


##参照
| 名前 | 説明 |
---------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`map::begin`](/reference/map/map/begin.md) | 先頭を指すイテレータを取得する |
| [`map::end`](/reference/map/map/end.md) | 末尾を指すイテレータを取得する |
| [`map::cbegin`](/reference/map/map/cbegin.md) | 先頭を指すconstイテレータを取得する |
| [`map::cend`](/reference/map/map/cend.md) | 末尾を指すconstイテレータを取得する |
| [`map::rbegin`](/reference/map/map/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`map::rend`](/reference/map/map/rend.md) | 先頭を指す逆イテレータを取得する |
| [`map::crend`](/reference/map/map/rend.md) | 先頭を指す逆constイテレータを取得する |
