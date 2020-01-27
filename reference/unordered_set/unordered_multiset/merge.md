# merge
* unordered_set[meta header]
* function[meta id-type]
* std[meta namespace]
* unordered_multiset[meta class]
* cpp17[meta cpp]

```cpp
template<class H2, class P2>
  void merge(unordered_set<Key, H2, P2, Allocator>& source);       // (1)
template<class H2, class P2>
  void merge(unordered_set<Key, H2, P2, Allocator>&& source);      // (2)
template<class H2, class P2>
  void merge(unordered_multiset<Key, H2, P2, Allocator>& source);  // (3)
template<class H2, class P2>
  void merge(unordered_multiset<Key, H2, P2, Allocator>&& source); // (4)
```

## 概要
引数 `source` 内の各要素を抽出し、`*this` のハッシュ関数と�ー�価(equality)述語を使用して `*this` への挿入を試みる。 
また、この操作で要素はコピーもムーブもされない。


## 要件
`source.get_allocator() == (*this).get_allocator()`


## 戻り値
なし


## 計算量
平均的なケースでは `O(N)`、最悪ケースでは `O(N*size()+N)`、ただし `N` は `source.size()` である。 


## 備考
`source` の転送された要素へのポインタおよび参照は、それらと同じ要素を参照するが、`*this` のメンバとして参照する。また、転送された要素を参照する反復�と`*this`を参照するすべての反復�は無効になるが、 `source` に残っている要素への反復�は有効なままになる。


## 例
```cpp example
#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_multiset<int> s1 = { 10, 20, 30 };
  std::unordered_multiset<int> s2 = { 10 };

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
- [Clang](/implementation.md#clang): 7.0.0
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
