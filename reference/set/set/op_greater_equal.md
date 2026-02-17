# operator>=
* set[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class Key, class Compare, class Allocator>
  bool
    operator>=(const set<Key,Compare,Allocator>& x,
               const set<Key,Compare,Allocator>& y); // (1) C++03
  template <class Key, class Compare, class Allocator>
  constexpr bool
    operator>=(const set<Key,Compare,Allocator>& x,
               const set<Key,Compare,Allocator>& y); // (1) C++26
}
```

## 概要
`x` が `y` より大きいか等しいかの判定を行う。


## 引数
- `x`, `y`<br/>
比較するコンテナ。


## 戻り値
`x` が `y` より大きいか等しい場合に `true`, そうでない場合に `false`。


## 計算量
[`size`](size.md)`()` に対して線形時間。


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int> s1, s2;
  s1.insert(10);
  s1.insert(20);
  s1.insert(30);
  s2 = s1;

  std::cout << (s1 >= s2) << std::endl;

  s2.insert(40);

  std::cout << (s1 >= s2) << std::endl;
}
```
* >=[color ff0000]
* insert[link insert.md]

### 出力
```
1
0
```


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
