```cpp
namespace std {

  template <class Iterator1, class Iterator2>
  auto operator-(const reverse_iterator<Iterator1>& x,
                 const reverse_iterator<Iterator2>& y)
    -> decltype(y.current - x.current);

}
```

##概要

<b>2つのreverse_iteratorの差を求める</b>


##戻り値

`y.current - x.current`

##例

```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());
  std::reverse_iterator<decltype(v)::iterator> it2(v.begin());

  std::ptrdiff_t result = it2 - it1;
  std::cout << result << std::endl;
}
```
* it2 - it1[color ff0000]

###出力

```cpp
3
```

##参照


