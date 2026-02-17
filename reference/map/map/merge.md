# merge
* map[meta header]
* function template[meta id-type]
* std[meta namespace]
* map[meta class]
* cpp17[meta cpp]

```cpp
template<class C2>
void merge(map<Key, T, C2, Allocator>& source);           // (1) C++17
template<class C2>
constexpr void merge(map<Key, T, C2, Allocator>& source); // (1) C++26

template<class C2>
void merge(map<Key, T, C2, Allocator>&& source);           // (2) C++17
template<class C2>
constexpr void merge(map<Key, T, C2, Allocator>&& source); // (2) C++26

template<class C2>
void merge(multimap<Key, T, C2, Allocator>& source);           // (3) C++17
template<class C2>
constexpr void merge(multimap<Key, T, C2, Allocator>& source); // (3) C++26

template<class C2>
void merge(multimap<Key, T, C2, Allocator>&& source);           // (4) C++17
template<class C2>
constexpr void merge(multimap<Key, T, C2, Allocator>&& source); // (4) C++26
```

## 概要
引数 `source` 内の各要素を抽出し、`*this` の比較オブジェクトを使用して `*this` への挿入を試みる。  
`source` の要素のキーと等価なキーの要素がある場合、その要素は `source` から抽出されない。  
また、この操作で要素はコピーもムーブもされない。


## 要件
`source.get_allocator() == (*this).get_allocator()`


## 戻り値
なし


## 計算量
`Nlog((*this).size()+N)`  
ここで、`N` の値は `source.size()` である。


## 備考
- `source` の転送された要素へのポインタおよび参照は、それらと同じ要素を参照するが、`*this` のメンバとして参照する。また、転送された要素を参照する反復子は、引き続きその要素を参照するが、転送後は `source` ではなく `*this` への反復子として動作する。
- (2), (4) : これらの右辺値参照オーバーロードは、一時オブジェクトを受け取った場合にコピーを発生させないためだけのものである。パラメータのオブジェクト内のポインタを破壊したり、高速なmerge処理が行われるわけではない


## 例外 
比較オブジェクトが例外を送出しない限り、例外を送出しない。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m1 = {
    {10, 'a'},
    {20, 'b'},
    {30, 'c'}
  };
  std::map<int, char> m2 = {
    {10, 'x'}
  };

  // m1 の要素を m2 に merge
  m2.merge(m1);

  std::cout << "m1 :" << std::endl;
  for (const auto& [key, value] : m1)
    std::cout << "[" << key << ", " << value << "]" << std::endl;

  std::cout << "\n" << "m2 :" << std::endl;
  for (const auto& [key, value] : m2)
    std::cout << "[" << key << ", " << value << "]" << std::endl;
}
```
* merge[color ff0000]

### 出力
```
m1 :
[10, a]

m2 :
[10, x]
[20, b]
[30, c]
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 8.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5 [mark verified]


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
