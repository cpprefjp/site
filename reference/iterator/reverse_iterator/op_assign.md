#operator=
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
reverse_iterator& operator=(const reverse_iterator& u) = default;

template <class U>
reverse_iterator& operator=(const reverse_iterator<U>& u);
```

##概要
- `reverse_iterator& operator=(const reverse_iterator<U>& u);`

`u.base()`をメンバ変数`current`に保持する。

要件： `U`が`Iterator`に変換可能であること


##戻り値
`*this`


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());

  // 同じ型のイテレータを代入
  std::reverse_iterator<decltype(v)::iterator> it2;
  it2 = it1;

  // 変換可能なイテレータを代入
  std::reverse_iterator<decltype(v)::const_iterator> it3;
  it3  = it2;

  std::reverse_iterator<decltype(v)::const_iterator> end(v.begin());

  for (; it3 != end; ++it3) {
    std::cout << *it3 << std::endl;
  }
}
```
* it2 = it1[color ff0000]
* it3  = it2[color ff0000]

###出力
```
3
2
1
```

##参照


