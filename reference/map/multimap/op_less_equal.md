# operator<=
* map[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class Key, class T, class Compare, class Allocator>
  bool
    operator<=(const multimap<Key,T, Compare,Allocator>& x,
               const multimap<Key,T, Compare,Allocator>& y); // (1) C++03
}
```

## 概要
`x` が `y` より小さいか等しいかの判定を行う。


## 引数
- `x`, `y`<br/>
比較するコンテナ。


## 戻り値
`x` が `y` より小さいか等しい場合に `true`, そうでない場合に `false`。


## 計算量
[`size`](/reference/map/multimap/size.md) に対して線形時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<char, int> m1, m2;
  m1.insert(std::make_pair('a', 10));
  m1.insert(std::make_pair('b', 20));
  m1.insert(std::make_pair('c', 30));
  m2 = m1;

  std::cout << (m1 <= m2) << std::endl;

  m2.insert(std::make_pair('d', 40));

  std::cout << (m1 <= m2) << std::endl;

  return 0;
}
```
* insert[link insert.md]

### 出力
```
1
1
```


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
