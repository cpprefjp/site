```cpp
reverse_iterator&
  operator+=(typename reverse_iterator<Iterator>::difference_type n);
```

##概要

<b>イテレータ自身をN回進める。</b>

<b>reverse_iteratorなので逆方向に進める。</b>


##効果

`current -= n`

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

  std::reverse_iterator<decltype(v)::iterator> it(v.end());

  it += 1; // イテレータを1回進める

  std::cout << *it << std::endl;
}
```
* it += 1[color ff0000]

###出力

```cpp
2
```

##参照


