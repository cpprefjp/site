# operator+ (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Iterator>
  reverse_iterator<Iterator> operator+(
    typename reverse_iterator<Iterator>::difference_type n,
    const reverse_iterator<Iterator>& x);                   // C++03

  template <class Iterator>
  constexpr reverse_iterator<Iterator> operator+(
    typename reverse_iterator<Iterator>::difference_type n,
    const reverse_iterator<Iterator>& x);                   // C++17
}
```

## 概要
イテレータを`n`回進める。

`reverse_iterator`は逆方向に進める。


## 戻り値
`reverse_iterator<Iterator>(x.current - n)`

## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());
  std::reverse_iterator<decltype(v)::iterator> it2 = 1 + it1; // イテレータを1回進める

  std::cout << *it2 << std::endl;
}
```
* 1 + it1[color ff0000]

### 出力
```
2
```

## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
