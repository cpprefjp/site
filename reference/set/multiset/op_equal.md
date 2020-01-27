# operator==
* set[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Key, class Compare, class Allocator>
  bool operator==(const multiset<Key,Compare,Allocator>& x, const multiset<Key,Compare,Allocator>& y);
}
```

## 概要
`x` が `y` と�しいかどうかの判定を行う。


## 戻り値
- C++03 : `x.`[`size`](size.md)`() == y.`[`size`](size.md)`() &&` [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`());`
- C++14 : [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`(), y.`[`end`](end.md)`());`


## 計算量
[`size()`](size.md) に対して線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::multiset<int> s1, s2;
  s1.insert(10);
  s1.insert(20);
  s1.insert(30);
  s2 = s1;

  std::cout << (s1 == s2) << std::endl;

  s2.insert(40);

  std::cout << (s1 == s2) << std::endl;
}
```
* ==[color ff0000]
* insert[link insert.md]

### 出力
```
1
0
```


## 参照
- [LWG Issue 2257. Simplify container requirements with the new algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2257)
    - C++14から、2つ目の範囲のendイテレータをとる`equal()`アルゴリズムを使用するようになった。

