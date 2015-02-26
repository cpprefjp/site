#swap (非メンバ関数)
* map[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class Key, class T, class Compare, class Allocator>
  void swap(multimap<Key,T,Compare,Allocator>& x,
            multimap<Key,T,Compare,Allocator>& y);
}
```

##概要
2つの `multimap` オブジェクトである `x` と 'y'が保持するコンテンツを交換する。サイズは異なる場合もある。 
このメンバ関数の呼び出しの後、呼び出し前に 'x' にあった要素は `y` へ、`y` 内にあった要素は `x` へ移る。全てのイテレータ、参照、ポインタは有効なまま残る。 


##効果
`x.`[`swap`](/reference/map/multimap/swap.md)`(y);`


##戻り値
なし


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <map>

template <class Map>
void print(const char* name, const Map& m)
{
  std::cout << name << " : {";
  for (const auto& x : m) {
    std::cout << "[" << x.first << "," << x.second << "], ";
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::multimap<int, char> c1;
  c1.insert( std::make_pair(10, 'a') );
  c1.insert( std::make_pair(20, 'b') );
  c1.insert( std::make_pair(30, 'c') );

  std::multimap<int, char> c2;
  c2.insert( std::make_pair(5, 'd') );
  c2.insert( std::make_pair(15, 'e') );

  // c1とc2を入れ替える
  std::swap(c1, c2);

  print("c1", c1);
  print("c2", c2);
}
```

###出力
```
c1 : {[5,d], [15,e], }
c2 : {[10,a], [20,b], [30,c], }
```

##バージョン
###言語
- C++03

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


