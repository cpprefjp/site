# operator--
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
reverse_iterator& operator--();             // (1) C++03
constexpr reverse_iterator& operator--();   // (1) C++17

reverse_iterator operator--(int);           // (2) C++03
constexpr reverse_iterator operator--(int); // (2) C++17
```

## 概要
イテレータをデクリメントする。

`reverse_iterator`は元となるイテレータを進める。


## 効果
- 前置デクリメント `operator--()`：

```cpp
++current;
return *this;
```

- 後置デクリメント `operator--(int)`：

```cpp
reverse_iterator tmp = *this;
++current;
return tmp;
```


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.begin());

  --it;

  std::cout << *it << std::endl;
}
```
* --it[color ff0000]

### 出力
```
1
```

## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
