# operator<=>
* map[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Key, class T, class Compare, class Allocator>
  synth-three-way-result<pair<const Key, T>>
    operator<=>(const multimap<Key,T,Compare,Allocator>& x,
                const multimap<Key,T,Compare,Allocator>& y); // (1) C++20
}
```
* pair[link /reference/utility/pair.md]

## 概要
`multimap`オブジェクトの三方比較を行う。


## テンプレートパラメータ制約
- 型 (`const`) `pair<const Key, T>` の値に対して`operator<=>`が定義されるか、型 (`const`) `pair<const Key, T>` の値に対して`operator<`が定義され全順序をもつこと


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
#include <map>

int main()
{
  std::multimap<int, char> m1;
  m1.insert(std::make_pair(0, 'a'));

  auto m2 = m1;

  assert((m1 <=> m2) == 0);

  m2.insert(std::make_pair(0, 'b'));

  assert((m1 <=> m2) != 0);

  return 0;
}
```
* insert[link insert.md]

### 出力
```
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
