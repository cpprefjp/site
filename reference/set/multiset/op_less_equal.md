# operator<=
* set[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Key, class Compare, class Allocator>
  bool operator<=(const multiset<Key,Compare,Allocator>& x, const multiset<Key,Compare,Allocator>& y);
}
```

## 概要
`x` が `y` より小さいか�しいかの判定を行う


## パラメータ
- `x`, `y`<br/>
比較するコンテナ。


## 戻り値
`x` が `y` より小さいか�しい場合に `true`, そうでない場合に `false`。


## 計算量
[`size`](size.md) に対して線形時間


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

  std::cout << (s1 <= s2) << std::endl;

  s1.insert(40);

  std::cout << (s1 <= s2) << std::endl;
}
```
* <=[color ff0000]
* insert[link insert.md]

### 出力
```
1
0
```
