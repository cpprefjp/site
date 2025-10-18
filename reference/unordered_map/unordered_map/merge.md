# merge
* unordered_map[meta header]
* function template[meta id-type]
* std[meta namespace]
* unordered_map[meta class]
* cpp17[meta cpp]

```cpp
template<class H2, class P2>
  void merge(unordered_map<Key, T, H2, P2, Allocator>& source);       // (1)
template<class H2, class P2>
  void merge(unordered_map<Key, T, H2, P2, Allocator>&& source);      // (2)
template<class H2, class P2>
  void merge(unordered_multimap<Key, T, H2, P2, Allocator>& source);  // (3)
template<class H2, class P2>
  void merge(unordered_multimap<Key, T, H2, P2, Allocator>&& source); // (4)
```

## 概要
引数 `source` 内の各要素を抽出し、`*this` のハッシュ関数とキー等価(equality)述語を使用して `*this` への挿入を試みる。 
`source` の要素のキーと等価(equivalent)なキーの要素がある場合、その要素は `source` から抽出されない。 
また、この操作で要素はコピーもムーブもされない。


## 要件
`source.get_allocator() == (*this).get_allocator()`


## 戻り値
なし


## 計算量
平均的なケースでは `O(N)`、最悪ケースでは `O(N*size()+N)`、ただし `N` は `source.size()` である。 


## 備考
`source` の転送された要素へのポインタおよび参照は、それらと同じ要素を参照するが、`*this` のメンバとして参照する。また、転送された要素を参照する反復子と`*this`を参照するすべての反復子は無効になるが、 `source` に残っている要素への反復子は有効なままになる。


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int, char> m1 = {
    {10, 'a'},
    {20, 'b'},
    {30, 'c'}
  };
  std::unordered_map<int, char> m2 = {
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

### 出力例
```
m1 :
[10, a]

m2 :
[20, b]
[30, c]
[10, x]
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5 [mark verified]


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
