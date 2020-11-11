# operator>
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Iterator1, class Iterator2>
  bool operator>(const reverse_iterator<Iterator1>& x,
                 const reverse_iterator<Iterator2>& y);           // C++03

  template <class Iterator1, class Iterator2>
  constexpr bool operator>(const reverse_iterator<Iterator1>& x,
                           const reverse_iterator<Iterator2>& y); // C++17
}
```

## 概要
2つのr`everse_iterator`オブジェクトにおいて、左辺が右辺より大きいかを判定する。

## テンプレートパラメータ制約

`x.current < y.current`が有効であり、戻り値が`bool`に変換可能であること。


## 戻り値
`x.current < y.current`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.begin());
  std::reverse_iterator<decltype(v)::iterator> it2(v.begin() + 1);

  if (it1 > it2) {
    std::cout << "greater" << std::endl;
  }
  else {
    std::cout << "not greater" << std::endl;
  }
}
```
* it1 > it2[color ff0000]


### 出力
```
greater
```

## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
