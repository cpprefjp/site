#operator==
* map[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
template <class Key, class T, class Compare, class Allocator>
bool operator==(const multimap<Key,T,Compare,Allocator>& x, const multimap<Key,T,Compare,Allocator>& y);
```

##概要
`x` が `y` と等しいかどうかの判定を行う。


##戻り値
- C++03 : `x.`[`size`](size.md)`() == y.`[`size`](size.md)`() &&` [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`());`
- C++14 : [`equal`](/reference/algorithm/equal.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`(), y.`[`begin`](begin.md)`(), y.`[`end`](end.md)`());`


##計算量
[`size()`](/reference/map/multimap/size.md) に対して線形時間


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::multimap<int,char> c1;
  c1.insert( std::make_pair(0,'a'));

  auto c2 = c1;

  std::cout << (c1 == c2) << std::endl;

  c2.insert( std::make_pair(0,'b'));

  std::cout << (c1 == c2) << std::endl;

  return 0;
}
```

###出力
```
1
0
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##参照
- [LWG Issue 2257. Simplify container requirements with the new algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2257)
    - C++14から、2つ目の範囲のendイテレータをとる`equal()`アルゴリズムを使用するようになった。

