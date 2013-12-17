#operator+ (フリー関数版)
```cpp
namespace std {
  template <class Iterator>
  reverse_iterator<Iterator> operator+(typename reverse_iterator<Iterator>::difference_type n,
                                       const reverse_iterator<Iterator>& x);
}
```

##概要
イテレータを`N`回進める。

`reverse_iterator`は逆方向に進める。


##戻り値
`reverse_iterator<Iterator>(x.current - n)`

##例
```cpp
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

###出力
```
2
```

##参照


