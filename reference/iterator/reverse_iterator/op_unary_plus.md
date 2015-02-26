#operator+
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]

```cpp
reverse_iterator
  operator+(typename reverse_iterator<Iterator>::difference_type n) const;
```

##概要
イテレータをN回進める。

`reverse_iterator`は逆方向に進める。


##戻り値
`reverse_iterator(current-n)`


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());
  std::reverse_iterator<decltype(v)::iterator> it2 = it1 + 1; // イテレータを1回進める

  std::cout << *it2 << std::endl;
}
```
* it1 + 1[color ff0000]

###出力
```
2
```

##参照


