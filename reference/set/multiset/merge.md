# merge
* set[meta header]
* function template[meta id-type]
* std[meta namespace]
* multiset[meta class]
* cpp17[meta cpp]

```cpp
template<class C2>
  void merge(set<Key, C2, Allocator>& source);       // (1)
template<class C2>
  void merge(set<Key, C2, Allocator>&& source);      // (2)
template<class C2>
  void merge(multiset<Key, C2, Allocator>& source);  // (3)
template<class C2>
  void merge(multiset<Key, C2, Allocator>&& source); // (4)
```

## 概要
引数 `source` 内の各要素を抽出し、`*this` の比較オブジェクトを使用して `*this` へ挿入する。  
また、この操作で要素はコピーもムーブもされない。


## 要件
`source.get_allocator() == (*this).get_allocator()`


## 戻り値
なし


## 計算量
`Nlog((*this).size()+N)`  
ここで、`N` の値は `source.size()` である。


## 備考
- `source` の転送された要素へのポインタおよび参照は、それらと同じ要素を参照するが、`*this` のメンバとして参照する。また、転送された要素を参照するイテレータは、引き続きその要素を参照するが、転送後は `source` ではなく `*this` へのイテレータとして動作する
- (2), (4) : これらの右辺値参照オーバーロードは、一時オブジェクトを受け取った場合にコピーを発生させないためだけのものである。パラメータのオブジェクト内のポインタを破壊したり、高速なmerge処理が行われるわけではない


## 例外 
比較オブジェクトが例外をスローしない限り、例外をスローしない。


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::multiset<int> s1 = { 10, 20, 30 };
  std::multiset<int> s2 = { 10 };

  // s1 の要素を s2 に merge
  s2.merge(s1);

  if (s1.size() != 0) std::cout << "s1 = { ";
  else std::cout << "s1 = {}\n";

  for(auto&& itr = s1.begin(); itr != s1.end();)
    std::cout << *itr << (++itr != s1.end() ? ", " : " }\n");

  if (s2.size() != 0) std::cout << "s2 = { ";
  else std::cout << "s2 = {}\n";

  for(auto&& itr = s2.begin(); itr != s2.end();)
    std::cout << *itr << (++itr != s2.end() ? ", " : " }\n");
}
```
* merge[color ff0000]

### 出力
```
s1 = {}
s2 = { 10, 10, 20, 30 }
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 8.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): 2021.10.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5 [mark verified]


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
