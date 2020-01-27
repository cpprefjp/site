# operator>=
* map[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Key, class T, class Compare, class Allocator>
  bool operator>=(const map<Key,T, Compare,Allocator>& x, const map<Key,T, Compare,Allocator>& y);
}
```

## 概要
`x` が `y` より大きいか�しいかの判定を行う。


## 引数
- `x`, `y`<br/>
比較するコンテナ。


## 戻り値
`x` が `y` より大きいか�しい場合に `true`, そうでない場合に `false`。


## 計算量
[`size`](/reference/map/map/size.md) に対して線形時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<char,int> m1, m2;
  m1.insert(std::make_pair('a',10));
  m1.insert(std::make_pair('b',20));
  m1.insert(std::make_pair('c',30));
  m2 = m1;

  std::cout << (m1 >= m2) << std::endl;

  m2.insert(std::make_pair('d',40));

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

