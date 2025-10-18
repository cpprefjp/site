# swap (非メンバ関数)
* unordered_map[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key, class T, class Hash, class Pred, class Alloc>
  void swap (unordered_multimap<Key,T,Hash,Pred,Alloc>& x,
             unordered_multimap<Key,T,Hash,Pred,Alloc>& y);

  template <class Key, class T, class Hash, class Pred, class Alloc>
  void swap (unordered_multimap<Key,T,Hash,Pred,Alloc>& x,
             unordered_multimap<Key,T,Hash,Pred,Alloc>& y)
    noexcept(noexcept(x.swap(y))); // C++17
}
```

## 概要
2つの `unordered_multimap` オブジェクトである `x` と 'y'が保持するコンテンツを交換する。サイズは異なる場合もある。

このメンバ関数の呼び出しの後、呼び出し前に 'x' にあった要素は `y` へ、`y` 内にあった要素は `x` へ移る。全てのイテレータ、参照、ポインタは有効なまま残る。


## 効果
`x.`[`swap`](swap.md)`(y);`


## 戻り値
なし

## 例外
投げない。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <unordered_map>

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
  std::unordered_multimap<int, char> um1;
  um1.insert(std::make_pair(10,'a'));
  um1.insert(std::make_pair(20,'b'));
  um1.insert(std::make_pair(30,'c'));
  um1.insert(std::make_pair(30,'d'));
  um1.insert(std::make_pair(30,'e'));

  std::unordered_multimap<int, char> um2;
  um2.insert(std::make_pair(5,'d'));
  um2.insert(std::make_pair(15,'e'));

  // um1とum2を入れ替える
  std::swap(um1, um2);

  print("um1", um1);
  print("um2", um2);
}
```
* std::swap[color ff0000]
* insert[link insert.md]

### 出力例
```
um1 : {[5,d], [15,e], }
um2 : {[10,a], [20,b], [30,c], [30,d], [30,e], }
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
