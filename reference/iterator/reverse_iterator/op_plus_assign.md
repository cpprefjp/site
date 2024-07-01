# operator+=
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
reverse_iterator& operator+=(difference_type n); // C++03
constexpr reverse_iterator& operator+=(difference_type n); // C++17
```

## 概要
イテレータ自身を`n`回進める。

`reverse_iterator`なので逆方向に進める。


## 効果
`current -= n`


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.end());

  it += 1; // イテレータを1回進める

  std::cout << *it << std::endl;
}
```
* it += 1;[color ff0000]

### 出力
```
2
```

## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
