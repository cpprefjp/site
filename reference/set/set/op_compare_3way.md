# operator<=>
* set[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Key, class Compare, class Allocator>
  synth-three-way-result<Key>
    operator<=>(const set<Key,Compare,Allocator>& x,
                const set<Key,Compare,Allocator>& y); // (1) C++20
}
```

## 概要
`set`オブジェクトの三方比較を行う。


## テンプレートパラメータ制約
- 型 (`const`) `Key` の値に対して`operator<=>`が定義されるか、型 (`const`) `Key` の値に対して`operator<`が定義され全順序をもつこと


## 効果
```cpp
return lexicographical_compare_three_way(
    x.begin(), x.end(),
    y.begin(), y.end(),
    synth-three-way);
```
* lexicographical_compare_three_way[link /reference/algorithm/lexicographical_compare_three_way.md]
* begin()[link begin.md]
* end()[link end.md]


## 計算量
線形時間


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <cassert>
#include <set>

int main()
{
  std::set<int> s1, s2;
  s1.insert(10);
  s1.insert(20);
  s1.insert(30);
  s2 = s1;

  assert((s1 <=> s2) == 0);

  s2.insert(40);

  assert((s1 <=> s2) != 0);
}
```
* insert[link insert.md]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
