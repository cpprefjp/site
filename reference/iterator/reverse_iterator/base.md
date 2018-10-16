# base
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
Iterator base() const;           // C++03
constexpr Iterator base() const; // C++17
```

## 概要
メンバ変数として保持している、元のイテレータを取得する。


## 戻り値
`current`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.begin());
  decltype(v)::iterator base = it.base(); // 元のイテレータ(v.begin())を取得

  std::cout << *base << std::endl;
}
```
* base()[color ff0000]

### 出力
```
1
```

## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
