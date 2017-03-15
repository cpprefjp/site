# operator==
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class Iterator1, class Iterator2>
  bool operator==(const reverse_iterator<Iterator1>& x,
                  const reverse_iterator<Iterator2>& y);
}
```

## 概要
2つの`reverse_iterator`オブジェクトが同じ要素を指しているかを判定する。


## 戻り値
`x.current == y.current`


## 例
```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());
  std::reverse_iterator<decltype(v)::iterator> it2(v.end());

  if (it1 == it2) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* it1 == it2[color ff0000]


### 出力
```
equal
```

## 参照

