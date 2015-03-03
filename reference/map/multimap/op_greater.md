#operator>
* map[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
template <class Key, class T, class Compare, class Allocator>
bool operator> (const multimap<Key,T,Compare,Allocator>& x, const multimap<Key,T,Compare,Allocator>& y);
```

##概要
`x` が `y` より大きいかどうかの判定を行う。


##パラメータ
- `x`, `y`<br/>
比較するコンテナ。


##戻り値
`x` が `y` より大きい場合に `true`, そうでない場合に `false`。


##計算量
[`size`](/reference/map/multimap/size.md) に対して線形時間。


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::multimap<char,int> s1, s2;
  s1.insert(std::make_pair('a',10));
  s1.insert(std::make_pair('b',20));
  s1.insert(std::make_pair('c',30));
  s2 = s1;

  std::cout << (s1 > s2) << std::endl;

  s1.insert(std::make_pair('d',40));

  std::cout << (s1 > s2) << std::endl;

  return 0;
}
```

###出力
```
0
1
```


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


