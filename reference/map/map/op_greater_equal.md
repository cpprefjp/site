#operator>=
* map[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class Key, class T, class Compare, class Allocator>
  bool operator>=(const map<Key,T, Compare,Allocator>& x, const map<Key,T, Compare,Allocator>& y);
}
```

##概要
`x` が `y` より大きいか等しいかの判定を行う。


##引数
- `x`, `y`<br/>
比較するコンテナ。


##戻り値
`x` が `y` より大きいか等しい場合に `true`, そうでない場合に `false`。


##計算量
[`size`](/reference/map/map/size.md) に対して線形時間。


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::map<char,int> s1, s2;
  s1.insert(std::make_pair('a',10));
  s1.insert(std::make_pair('b',20));
  s1.insert(std::make_pair('c',30));
  s2 = s1;

  std::cout << (s1 >= s2) << std::endl;

  s2.insert(std::make_pair('d',40));

  std::cout << (s1 >= s2) << std::endl;

  return 0;
}
```

###出力
```
1
0
```

