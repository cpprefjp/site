# swap (非メンバ関数)
* map[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class Key, class T, class Compare, class Allocator>
  void swap(map<Key,T,Compare,Allocator>& x,
            map<Key,T,Compare,Allocator>& y);
}
```

## 概要
2つの `map` オブジェクトである `x` と 'y'が保持するコンテンツを交換する。サイズは異なる場合もある。 
このメンバ関数の呼び出しの後、呼び出し前に 'x' にあった要素は `y` へ、`y` 内にあった要素は `x` へ移る。全てのイテレータ、参照、ポインタは有効なまま残る。 


## 効果
`x.`[`swap`](swap.md)`(y);`


## 戻り値
なし


## 計算量
定数時間


## 例
```cpp example
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
  std::map<int, char> m1 = {
    {10, 'a'},
    {20, 'b'},
    {30, 'c'}
  };

  std::map<int, char> m2 = {
    {5, 'd'},
    {15, 'e'}
  };

  // m1とm2を入れ替える
  std::swap(m1, m2);

  print("m1", m1);
  print("m2", m2);
}
```
* std::swap[color ff0000]

### 出力
```
m1 : {[5,d], [15,e], }
m2 : {[10,a], [20,b], [30,c], }
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


