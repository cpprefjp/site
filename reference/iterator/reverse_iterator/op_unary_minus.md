# operator-
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
reverse_iterator operator-(difference_type n) const;           // C++03
constexpr reverse_iterator operator-(difference_type n) const; // C++17
```

## 概要
イテレータを`n`回逆に進める。

`reverse_iterator`なので元のイテレータを進める。


## 戻り値
`reverse_iterator(current+n)`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.begin());
  std::reverse_iterator<decltype(v)::iterator> it2 = it1 - 1; // イテレータを1回逆に進める

  std::cout << *it2 << std::endl;
}
```
* it1 - 1;[color ff0000]

### 出力
```
1
```

## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
