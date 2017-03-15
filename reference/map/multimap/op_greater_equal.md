# operator>=
* map[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
template <class Key, class T, class Compare, class Allocator>
bool operator>=(const multimap<Key,T, Compare,Allocator>& x, const multimap<Key,T, Compare,Allocator>& y);
```

## 概要
`x` が `y` より大きいか等しいかの判定を行う。


## 引数
- `x`, `y`<br/>
比較するコンテナ。


## 戻り値
`x` が `y` より大きいか等しい場合に `true`, そうでない場合に `false`。


## 計算量
[`size`](/reference/map/multimap/size.md) に対して線形時間。


## 例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::multimap<char, int> m1, m2;
  m1.insert(std::make_pair('a', 10));
  m1.insert(std::make_pair('b', 20));
  m1.insert(std::make_pair('c', 30));
  m2 = m1;

  std::cout << (m1 >= m2) << std::endl;

  m2.insert(std::make_pair('d', 40));

  std::cout << (m1 >= m2) << std::endl;

  return 0;
}
```
* insert[link insert.md]

### 出力
```
1
0
```

